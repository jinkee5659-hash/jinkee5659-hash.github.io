(function () {
  const cities = window.COMMUNITY_CITIES || [];
  const sources = window.COMMUNITY_SOURCES || {};
  const statusConfig = {
    hub: { label: "多期活动城市", color: "#0f8f72", rank: 5 },
    active: { label: "近期活跃", color: "#2f79d0", rank: 4 },
    history: { label: "历史出现", color: "#d98512", rank: 3 },
    group: { label: "已有城市群", color: "#6d5bd0", rank: 2 },
    directory: { label: "待补充", color: "#727b8c", rank: 1 }
  };

  const dom = {
    map: document.querySelector("#chinaMap"),
    list: document.querySelector("#cityList"),
    detail: document.querySelector("#detailPanel"),
    search: document.querySelector("#citySearch"),
    filters: Array.from(document.querySelectorAll(".filter-button")),
    provincePill: document.querySelector("#provinceFilter"),
    provincePillText: document.querySelector("#provinceFilter span"),
    resetMap: document.querySelector("#resetMap"),
    totalCities: document.querySelector("#totalCities"),
    confirmedCities: document.querySelector("#confirmedCities"),
    groupCities: document.querySelector("#groupCities")
  };

  const state = {
    filter: "all",
    query: "",
    province: "",
    selectedId: getInitialCityId()
  };

  let chart;
  let geoJson;

  init();

  function init() {
    cities.sort((a, b) => {
      const statusDelta = statusConfig[b.status].rank - statusConfig[a.status].rank;
      const activityDelta = b.activityCount - a.activityCount;
      return statusDelta || activityDelta || a.name.localeCompare(b.name, "zh-Hans-CN");
    });

    dom.totalCities.textContent = cities.length;
    dom.confirmedCities.textContent = cities.filter((city) => city.organizers.length).length;
    dom.groupCities.textContent = cities.reduce((total, city) => total + city.activityCount, 0);

    bindEvents();
    renderAll();
    loadMap();
    refreshIcons();
  }

  function bindEvents() {
    dom.search.addEventListener("input", (event) => {
      state.query = event.target.value.trim();
      renderAll();
    });

    dom.filters.forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.filter;
        dom.filters.forEach((item) => item.classList.toggle("is-active", item === button));
        renderAll();
      });
    });

    dom.provincePill.addEventListener("click", () => {
      state.province = "";
      renderAll();
      renderChart();
    });

    dom.resetMap.addEventListener("click", () => {
      state.province = "";
      state.filter = "all";
      state.query = "";
      dom.search.value = "";
      dom.filters.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
      if (chart) {
        chart.dispatchAction({ type: "geoRoam", zoom: 1 });
      }
      renderAll();
      renderChart();
    });
  }

  async function loadMap() {
    if (!window.echarts) {
      dom.map.innerHTML = "<p class=\"map-fallback\">地图组件加载失败，城市列表仍可使用。</p>";
      return;
    }

    try {
      const response = await fetch("assets/china.json");
      geoJson = await response.json();
      echarts.registerMap("china", geoJson);
      chart = echarts.init(dom.map);
      chart.on("click", handleMapClick);
      window.addEventListener("resize", () => chart.resize());
      renderChart();
    } catch (error) {
      dom.map.innerHTML = "<p class=\"map-fallback\">地图数据加载失败，城市列表仍可使用。</p>";
      console.error(error);
    }
  }

  function handleMapClick(params) {
    if (params.seriesType === "effectScatter" || params.seriesType === "scatter") {
      selectCity(params.data.id);
      return;
    }

    if ((params.seriesType === "map" || params.componentType === "geo") && params.name) {
      state.province = params.name;
      const firstCity = getFilteredCities()[0];
      if (firstCity) state.selectedId = firstCity.id;
      renderAll();
      renderChart();
    }
  }

  function renderAll() {
    const filtered = getFilteredCities();
    if (!filtered.some((city) => city.id === state.selectedId) && filtered[0]) {
      state.selectedId = filtered[0].id;
    }
    renderProvincePill();
    renderList(filtered);
    renderDetail();
    renderChart();
    refreshIcons();
  }

  function renderProvincePill() {
    dom.provincePill.hidden = !state.province;
    if (state.province) {
      dom.provincePillText.textContent = state.province;
    }
  }

  function getFilteredCities() {
    const query = state.query.toLowerCase();
    return cities.filter((city) => {
      if (state.filter === "organizer" && !city.organizers.length) return false;
      if (state.filter === "active" && !["hub", "active"].includes(city.status)) return false;
      if (state.filter === "group" && !city.groupAvailable) return false;
      if (state.province && city.province !== state.province) return false;
      if (!query) return true;

      return [
        city.name,
        city.province,
        city.region,
        city.address,
        city.notes,
        city.nextEvent,
        city.organizers.join(" "),
        city.activities.map((activity) => `${activity.date} ${activity.title}`).join(" ")
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }

  function renderList(filtered) {
    if (!filtered.length) {
      dom.list.innerHTML = "<div class=\"empty-state\">没有匹配城市</div>";
      return;
    }

    dom.list.innerHTML = filtered
      .map((city) => {
        const status = statusConfig[city.status];
        const active = city.id === state.selectedId ? " is-active" : "";
        const organizers = city.organizers.length ? city.organizers.join("、") : "负责人待公开";
        return `
          <button class="city-row${active}" type="button" data-id="${city.id}">
            <span class="status-line" style="--status:${status.color}"></span>
            <span class="city-main">
              <strong>${city.name}</strong>
              <small>${city.region} · ${city.activityCount} 条历史活动 · ${organizers}</small>
            </span>
            <span class="city-badges">
              <span>${status.label}</span>
              ${city.groupAvailable ? "<span>城市群</span>" : ""}
            </span>
          </button>
        `;
      })
      .join("");

    Array.from(dom.list.querySelectorAll(".city-row")).forEach((row) => {
      row.addEventListener("click", () => selectCity(row.dataset.id));
    });
  }

  function renderDetail() {
    const city = cities.find((item) => item.id === state.selectedId) || cities[0];
    if (!city) {
      dom.detail.innerHTML = "";
      return;
    }

    const status = statusConfig[city.status];
    const organizers = city.organizers.length ? city.organizers.join("、") : "待公开";
    const phoneText = city.phone || "待公开";
    const wechatText = city.wechat || "待公开";
    const primaryLink = city.links[0] || { label: "知识库", url: sources.rootWiki };
    const latestActivity = city.activities[0];
    const activityMarkup = city.activities.length
      ? city.activities
          .map(
            (activity) => `
              <a class="activity-card" href="${activity.url}" target="_blank" rel="noreferrer">
                <time>${formatDate(activity.date)}</time>
                <span>${activity.title}</span>
                <i data-lucide="arrow-up-right"></i>
              </a>
            `
          )
          .join("")
      : "<div class=\"empty-state compact\">暂无公开活动记录</div>";

    dom.detail.innerHTML = `
      <div class="detail-top">
        <p class="eyebrow">${city.region} · ${city.province}</p>
        <h2>${city.name}</h2>
        <span class="status-badge" style="--status:${status.color}">${status.label}</span>
      </div>

      <div class="detail-actions">
        <a class="primary-action" href="${primaryLink.url}" target="_blank" rel="noreferrer">
          <i data-lucide="external-link"></i>
          ${primaryLink.label}
        </a>
        <button class="secondary-action" type="button" data-copy="${city.name} ${primaryLink.url}">
          <i data-lucide="copy"></i>
          复制入口
        </button>
      </div>

      <dl class="detail-list">
        <div>
          <dt>负责人</dt>
          <dd>${organizers}</dd>
        </div>
        <div>
          <dt>电话</dt>
          <dd>${phoneText}</dd>
        </div>
        <div>
          <dt>微信</dt>
          <dd>${wechatText}</dd>
        </div>
        <div>
          <dt>地址</dt>
          <dd>${city.address}</dd>
        </div>
        <div>
          <dt>历史活动</dt>
          <dd>${city.activityCount} 条公开记录</dd>
        </div>
        <div>
          <dt>最近出现</dt>
          <dd>${latestActivity ? `${formatDate(latestActivity.date)} · ${latestActivity.title}` : "待补充"}</dd>
        </div>
      </dl>

      <section class="activity-section">
        <h3>历史活动</h3>
        <div class="activity-list">
          ${activityMarkup}
        </div>
      </section>

      <section class="link-section">
        <h3>公开内容</h3>
        <div class="link-list">
          ${city.links
            .map(
              (link) => `
                <a href="${link.url}" target="_blank" rel="noreferrer">
                  <i data-lucide="arrow-up-right"></i>
                  <span>${link.label}</span>
                </a>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="note-section">
        <h3>数据备注</h3>
        <p>${city.notes}</p>
      </section>
    `;

    const copyButton = dom.detail.querySelector("[data-copy]");
    copyButton.addEventListener("click", async () => {
      await copyToClipboard(copyButton.dataset.copy);
      copyButton.classList.add("is-copied");
      copyButton.innerHTML = '<i data-lucide="check"></i> 已复制';
      refreshIcons();
      window.setTimeout(() => {
        copyButton.classList.remove("is-copied");
        copyButton.innerHTML = '<i data-lucide="copy"></i> 复制入口';
        refreshIcons();
      }, 1200);
    });
  }

  function renderChart() {
    if (!chart || !geoJson) return;

    const filtered = getFilteredCities();
    const selectedCity = cities.find((city) => city.id === state.selectedId);
    const isCompact = window.innerWidth < 640;
    const scatterData = filtered.map((city) => ({
      id: city.id,
      name: city.name,
      value: [...city.coords, statusConfig[city.status].rank],
      city,
      itemStyle: { color: statusConfig[city.status].color },
      label: {
        show: city.id === state.selectedId || (!isCompact && city.status === "hub"),
        formatter: city.name
      },
      symbolSize: city.id === state.selectedId
        ? 22
        : 10 + Math.min(city.activityCount, 8) * 1.5 + statusConfig[city.status].rank
    }));

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderWidth: 0,
        backgroundColor: "rgba(255,255,255,0.96)",
        textStyle: { color: "#19212f" },
        formatter(params) {
          if (!params.data || !params.data.city) return params.name || "";
          const city = params.data.city;
          const status = statusConfig[city.status].label;
          return `
            <div class="tooltip">
              <strong>${city.name}</strong>
              <span>${status} · ${city.activityCount} 条历史活动</span>
              <small>${city.address}</small>
            </div>
          `;
        }
      },
      geo: {
        map: "china",
        roam: true,
        zoom: selectedCity ? 1.17 : 1.12,
        center: selectedCity ? getMapCenter(selectedCity.coords) : undefined,
        scaleLimit: { min: 0.9, max: 6 },
        label: { show: false },
        itemStyle: {
          areaColor: "#d8e6dd",
          borderColor: "#ffffff",
          borderWidth: 1
        },
        emphasis: {
          label: { color: "#17202f" },
          itemStyle: { areaColor: "#b9dccd" }
        },
        select: {
          itemStyle: { areaColor: "#cbe6dd" }
        }
      },
      series: [
        {
          name: "社区城市",
          type: "effectScatter",
          coordinateSystem: "geo",
          rippleEffect: {
            number: 2,
            scale: 3.2,
            brushType: "stroke"
          },
          label: {
            position: "right",
            color: "#17202f",
            fontSize: 12,
            backgroundColor: "rgba(255,255,255,0.84)",
            borderRadius: 4,
            padding: [3, 6]
          },
          emphasis: {
            focus: "series",
            label: { show: true }
          },
          data: scatterData
        }
      ]
    });
  }

  function getMapCenter(coords) {
    const [lng, lat] = coords;
    return [lng + 3.5, lat + 0.6];
  }

  function selectCity(id) {
    state.selectedId = id;
    renderAll();
    window.history.replaceState(null, "", `#${id}`);
  }

  function getInitialCityId() {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (cities.some((city) => city.id === hash)) return hash;
    return cities.some((city) => city.id === "chengdu") ? "chengdu" : cities[0]?.id;
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function formatDate(date) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}.${month}.${day}`;
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons({ strokeWidth: 1.9 });
    }
  }
})();
