// -------------------- helpers --------------------
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// -------------------- resume generation --------------------
function generateResume() {
  setText("cv-fullname", getVal("fullName") || "Your Name");
  setText("cv-headline", getVal("headline") || "Your Role / Headline");
  setText("cv-summary", getVal("summary") || "");

  setText("cv-email", getVal("email") ? `Email: ${getVal("email")}` : "");
  setText("cv-phone", getVal("phone") ? `Phone: ${getVal("phone")}` : "");
  setText("cv-location", getVal("location") ? `Location: ${getVal("location")}` : "");
  setText("cv-linkedin", getVal("linkedin") ? `LinkedIn: ${getVal("linkedin")}` : "");
  setText("cv-github", getVal("github") ? `GitHub: ${getVal("github")}` : "");

  // education block
  const eduDegree = getVal("eduDegree"), eduCollege = getVal("eduCollege");
  const eduStart = getVal("eduStart"), eduEnd = getVal("eduEnd"), eduDetails = getVal("eduDetails");
  const cvEducation = document.getElementById("cv-education");
  if (cvEducation) {
    cvEducation.innerHTML = "";
    if (eduDegree || eduCollege || eduStart || eduEnd || eduDetails) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${eduDegree || ""}</strong>${eduCollege ? ` | ${eduCollege}` : ""}${eduStart || eduEnd ? `<br><span>${eduStart || ""} - ${eduEnd || ""}</span>` : ""}${eduDetails ? `<br><span>${eduDetails}</span>` : ""}`;
      cvEducation.appendChild(div);
    }
  }

  // experience block
  const expRole = getVal("expRole"), expCompany = getVal("expCompany");
  const expStart = getVal("expStart"), expEnd = getVal("expEnd"), expDetails = getVal("expDetails");
  const cvExperience = document.getElementById("cv-experience");
  if (cvExperience) {
    cvExperience.innerHTML = "";
    if (expRole || expCompany || expStart || expEnd || expDetails) {
      const div = document.createElement("div");
      let detailHtml = "";
      if (expDetails) {
        const lines = expDetails.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length) detailHtml = "<ul>" + lines.map(l => `<li>${l}</li>`).join("") + "</ul>";
      }
      div.innerHTML = `<strong>${expRole || ""}</strong>${expCompany ? ` | ${expCompany}` : ""}${expStart || expEnd ? `<br><span>${expStart || ""} - ${expEnd || ""}</span>` : ""}${detailHtml}`;
      cvExperience.appendChild(div);
    }
  }

  // projects
  const projName = getVal("projName"), projTech = getVal("projTech"), projDetails = getVal("projDetails");
  const cvProjects = document.getElementById("cv-projects");
  if (cvProjects) {
    cvProjects.innerHTML = "";
    if (projName || projTech || projDetails) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${projName || ""}</strong>${projTech ? `<br><span>${projTech}</span>` : ""}${projDetails ? `<br><span>${projDetails}</span>` : ""}`;
      cvProjects.appendChild(div);
    }
  }

  // skills
  const skillsText = getVal("skills");
  const skillsList = document.getElementById("cv-skills");
  if (skillsList) {
    skillsList.innerHTML = "";
    if (skillsText) {
      skillsText.split(/,|\n/).map(s => s.trim()).filter(Boolean).forEach(s => {
        const li = document.createElement("li"); li.textContent = s; skillsList.appendChild(li);
      });
    }
  }

  // achievements
  const achievementsText = getVal("achievements");
  const achievementsList = document.getElementById("cv-achievements");
  if (achievementsList) {
    achievementsList.innerHTML = "";
    if (achievementsText) {
      achievementsText.split("\n").map(a => a.trim()).filter(Boolean).forEach(a => {
        const li = document.createElement("li"); li.textContent = a; achievementsList.appendChild(li);
      });
    }
  }
}

// -------------------- profile photo handling --------------------
function handleProfilePicInput(e) {
  const file = e.target.files && e.target.files[0];
  const img = document.getElementById("cv-photo");
  if (!img) return;
  if (!file) {
    img.src = "";
    img.style.display = "none";
    return;
  }

  // size limit ~2.5MB
  if (file.size > 2.5 * 1024 * 1024) {
    alert("Please choose an image smaller than 2.5 MB.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (ev) {
    img.src = ev.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// remove photo helper (if you have a remove button)
function removePhoto() {
  const input = document.getElementById("profilePic");
  if (input) input.value = "";
  const img = document.getElementById("cv-photo");
  if (img) { img.src = ""; img.style.display = "none"; }
}

// -------------------- scroll helper for CTA buttons --------------------
function scrollToBuilder() {
  const el = document.getElementById("builder");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// -------------------- init listeners --------------------
document.addEventListener("DOMContentLoaded", function () {
  // main controls
  const gen = document.getElementById("generateBtn");
  const clr = document.getElementById("clearBtn");
  const prt = document.getElementById("printBtn");
  const profileInput = document.getElementById("profilePic");
  const removeBtn = document.getElementById("removePhoto"); // optional
  const navStart = document.getElementById("navStart");
  const heroStart = document.getElementById("heroStart2") || document.getElementById("heroStart");

  if (gen) gen.addEventListener("click", function () { generateResume(); });
  if (clr) clr.addEventListener("click", function () {
    const form = document.getElementById("cvForm");
    if (form) form.reset();
    // reset preview
    setText("cv-fullname", "Your Name");
    setText("cv-headline", "Your Role / Headline");
    setText("cv-summary", "");
    ["cv-email", "cv-phone", "cv-location", "cv-linkedin", "cv-github"].forEach(id => setText(id, ""));
    ["cv-education", "cv-experience", "cv-projects", "cv-skills", "cv-achievements"].forEach(id => {
      const el = document.getElementById(id); if (el) el.innerHTML = "";
    });
    removePhoto();
  });
  if (prt) prt.addEventListener("click", function () {
    // ensure preview updated
    generateResume();
    // short delay so DOM paints updated content, then print
    setTimeout(() => window.print(), 250);
  });

  if (profileInput) profileInput.addEventListener("change", handleProfilePicInput);
  if (removeBtn) removeBtn.addEventListener("click", removePhoto);

  if (navStart) navStart.addEventListener("click", scrollToBuilder);
  if (heroStart) heroStart.addEventListener("click", scrollToBuilder);

  // hide image initially if present
  const img = document.getElementById("cv-photo");
  if (img) img.style.display = img.src ? "block" : "none";
});
