
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderSkillGroup(group) {
  const skillsMarkup = group.skills
    .map((skill) => {
      const ticks = Array.from({ length: 5 })
        .map((_, i) => `<span class="skill-tick" data-filled="${i < skill.level}"><span></span></span>`)
        .join("");
      return `
        <div class="skill-item">
          <div class="skill-item-top">
            <span>${escapeHtml(skill.label)}</span>
          </div>
          <div class="skill-bar">${ticks}</div>
        </div>`;
    })
    .join("");

  return `
    <div class="skill-group">
      <h3>${escapeHtml(group.name)}</h3>
      ${skillsMarkup}
    </div>`;
}

function renderProjectCard(project) {
  const tags = project.tags
    .map((tag) => `<span class="project-tag">--${escapeHtml(tag)}</span>`)
    .join("");

  return `
    <article class="project-card">
      <div class="project-card-head">${escapeHtml(project.filename)}</div>
      <div class="project-card-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-links">
          <a href="${project.demoUrl}">View demo</a>
          <a href="${project.codeUrl}">Source</a>
        </div>
      </div>
    </article>`;
}


function renderTimelineItem(item) {
  const points = item.points
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");

  return `
    <div class="timeline-item">
      <div class="timeline-date">${escapeHtml(item.date)}</div>
      <h3 class="timeline-role">${escapeHtml(item.role)}</h3>
      <span class="timeline-org">${escapeHtml(item.org)}</span>
      <ul class="timeline-list">${points}</ul>
    </div>`;
}

function renderList(container, items, renderFn) {
  if (!container) return;
  container.innerHTML = items.map(renderFn).join("");
}
