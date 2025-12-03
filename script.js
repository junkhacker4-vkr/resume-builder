// Helpers
function getVal(id) {
  return document.getElementById(id).value.trim();
}
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function generateResume() {
  // BASIC INFO
  const fullName = getVal("fullName") || "Your Name";
  const headline = getVal("headline") || "Your Role / Headline";
  const summary = getVal("summary");

  setText("cv-fullname", fullName);
  setText("cv-headline", headline);
  setText("cv-summary", summary);

  // CONTACT
  const email = getVal("email");
  const phone = getVal("phone");
  const location = getVal("location");
  const linkedin = getVal("linkedin");
  const github = getVal("github");

  setText("cv-email", email ? `Email: ${email}` : "");
  setText("cv-phone", phone ? `Phone: ${phone}` : "");
  setText("cv-location", location ? `Location: ${location}` : "");
  setText("cv-linkedin", linkedin ? `LinkedIn: ${linkedin}` : "");
  setText("cv-github", github ? `GitHub: ${github}` : "");

  // EDUCATION
  const eduDegree = getVal("eduDegree");
  const eduCollege = getVal("eduCollege");
  const eduStart = getVal("eduStart");
  const eduEnd = getVal("eduEnd");
  const eduDetails = getVal("eduDetails");

  const cvEducation = document.getElementById("cv-education");
  cvEducation.innerHTML = "";

  if (eduDegree || eduCollege || eduStart || eduEnd || eduDetails) {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${eduDegree || ""}</strong>
      ${eduCollege ? ` | ${eduCollege}` : ""}
      ${eduStart || eduEnd ? `<br><span>${eduStart || ""} - ${eduEnd || ""}</span>` : ""}
      ${eduDetails ? `<br><span>${eduDetails}</span>` : ""}
    `;
    cvEducation.appendChild(div);
  }

  // EXPERIENCE
  const expRole = getVal("expRole");
  const expCompany = getVal("expCompany");
  const expStart = getVal("expStart");
  const expEnd = getVal("expEnd");
  const expDetails = getVal("expDetails");

  const cvExperience = document.getElementById("cv-experience");
  cvExperience.innerHTML = "";

  if (expRole || expCompany || expStart || expEnd || expDetails) {
    const div = document.createElement("div");

    let detailHtml = "";
    if (expDetails) {
      const lines = expDetails
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l);
      if (lines.length) {
        detailHtml =
          "<ul>" + lines.map((line) => `<li>${line}</li>`).join("") + "</ul>";
      }
    }

    div.innerHTML = `
      <strong>${expRole || ""}</strong>
      ${expCompany ? ` | ${expCompany}` : ""}
      ${expStart || expEnd ? `<br><span>${expStart || ""} - ${expEnd || ""}</span>` : ""}
      ${detailHtml}
    `;
    cvExperience.appendChild(div);
  }

  // PROJECTS
  const projName = getVal("projName");
  const projTech = getVal("projTech");
  const projDetails = getVal("projDetails");

  const cvProjects = document.getElementById("cv-projects");
  cvProjects.innerHTML = "";

  if (projName || projTech || projDetails) {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${projName || ""}</strong>
      ${projTech ? `<br><span>${projTech}</span>` : ""}
      ${projDetails ? `<br><span>${projDetails}</span>` : ""}
    `;
    cvProjects.appendChild(div);
  }

  // SKILLS
  const skillsText = getVal("skills");
  const skillsList = document.getElementById("cv-skills");
  skillsList.innerHTML = "";

  if (skillsText) {
    skillsText
      .split(/,|\n/)
      .map((s) => s.trim())
      .filter((s) => s)
      .forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
      });
  }

  // ACHIEVEMENTS
  const achievementsText = getVal("achievements");
  const achievementsList = document.getElementById("cv-achievements");
  achievementsList.innerHTML = "";

  if (achievementsText) {
    achievementsText
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a)
      .forEach((ach) => {
        const li = document.createElement("li");
        li.textContent = ach;
        achievementsList.appendChild(li);
      });
  }

  // Scroll preview into view on small screens
  document.querySelector(".preview-column").scrollIntoView({ behavior: "smooth" });
}

// Buttons events
document.getElementById("generateBtn").addEventListener("click", generateResume);

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("cvForm").reset();

  setText("cv-fullname", "Your Name");
  setText("cv-headline", "Your Role / Headline");
  setText("cv-summary", "");

  ["cv-email", "cv-phone", "cv-location", "cv-linkedin", "cv-github"].forEach((id) =>
    setText(id, "")
  );
  ["cv-education", "cv-experience", "cv-projects", "cv-skills", "cv-achievements"].forEach(
    (id) => (document.getElementById(id).innerHTML = "")
  );
});

// Scroll helpers for hero/nav buttons
function scrollToBuilder() {
  document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
}
function scrollToHow() {
  document.getElementById("how").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("heroStart").addEventListener("click", scrollToBuilder);
document.getElementById("navStart").addEventListener("click", scrollToBuilder);
document.getElementById("heroScrollHow").addEventListener("click", scrollToHow);
