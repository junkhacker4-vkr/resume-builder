// simple helpers
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function generateResume() {
  // basic
  setText("cv-fullname", getVal("fullName") || "Your Name");
  setText("cv-headline", getVal("headline") || "Your Role / Headline");
  setText("cv-summary", getVal("summary") || "");

  // contact
  setText("cv-email", getVal("email") ? `Email: ${getVal("email")}` : "");
  setText("cv-phone", getVal("phone") ? `Phone: ${getVal("phone")}` : "");
  setText("cv-location", getVal("location") ? `Location: ${getVal("location")}` : "");
  setText("cv-linkedin", getVal("linkedin") ? `LinkedIn: ${getVal("linkedin")}` : "");
  setText("cv-github", getVal("github") ? `GitHub: ${getVal("github")}` : "");

  // education
  const eduDegree = getVal("eduDegree"), eduCollege = getVal("eduCollege");
  const eduStart = getVal("eduStart"), eduEnd = getVal("eduEnd"), eduDetails = getVal("eduDetails");
  const cvEducation = document.getElementById("cv-education");
  cvEducation.innerHTML = "";
  if (eduDegree || eduCollege || eduStart || eduEnd || eduDetails) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${eduDegree || ""}</strong>${eduCollege ? ` | ${eduCollege}` : ""}${eduStart || eduEnd ? `<br><span>${eduStart || ""} - ${eduEnd || ""}</span>` : ""}${eduDetails ? `<br><span>${eduDetails}</span>` : ""}`;
    cvEducation.appendChild(div);
  }

  // experience
  const expRole = getVal("expRole"), expCompany = getVal("expCompany"), expStart = getVal("expStart"), expEnd = getVal("expEnd"), expDetails = getVal("expDetails");
  const cvExperience = document.getElementById("cv-experience");
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

  // projects
  const projName = getVal("projName"), projTech = getVal("projTech"), projDetails = getVal("projDetails");
  const cvProjects = document.getElementById("cv-projects");
  cvProjects.innerHTML = "";
  if (projName || projTech || projDetails) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${projName || ""}</strong>${projTech ? `<br><span>${projTech}</span>` : ""}${projDetails ? `<br><span>${projDetails}</span>` : ""}`;
    cvProjects.appendChild(div);
  }

  // skills
  const skillsText = getVal("skills");
  const skillsList = document.getElementById("cv-skills");
  skillsList.innerHTML = "";
  if (skillsText) {
    skillsText.split(/,|\n/).map(s => s.trim()).filter(Boolean).forEach(s => {
      const li = document.createElement("li"); li.textContent = s; skillsList.appendChild(li);
    });
  }

  // achievements
  const achievementsText = getVal("achievements");
  const achievementsList = document.getElementById("cv-achievements");
  achievementsList.innerHTML = "";
  if (achievementsText) {
    achievementsText.split("\n").map(a => a.trim()).filter(Boolean).forEach(a => {
      const li = document.createElement("li"); li.textContent = a; achievementsList.appendChild(li);
    });
  }
}

// profile image reader
function handleProfilePic(e) {
  const file = e.target.files && e.target.files[0];
  const img = document.getElementById("cv-photo");
  if (!file) { img.src = ""; img.style.display = "none"; return; }
  if (file.size > 2.5 * 1024 * 1024) { alert("Please choose an image smaller than 2.5MB."); e.target.value = ""; return; }
  const reader = new FileReader();
  reader.onload = function(ev) {
    img.src = ev.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// remove photo
function removePhoto() {
  const input = document.getElementById("profilePic");
  input.value = "";
  const img = document.getElementById("cv-photo");
  img.src = ""; img.style.display = "none";
}

// init events
document.addEventListener("DOMContentLoaded", function() {
  const gen = document.getElementById("generateBtn");
  const clr = document.getElementById("clearBtn");
  const prt = document.getElementById("printBtn");
  const profile = document.getElementById("profilePic");
  const remove = document.getElementById("removePhoto");

  if (gen) gen.addEventListener("click", function(){ generateResume(); /* ensure preview updated */ });
  if (clr) clr.addEventListener("click", function(){
    document.getElementById("cvForm").reset();
    setText("cv-fullname","Your Name"); setText("cv-headline","Your Role / Headline"); setText("cv-summary","");
    ["cv-email","cv-phone","cv-location","cv-linkedin","cv-github"].forEach(id => setText(id,""));
    ["cv-education","cv-experience","cv-projects","cv-skills","cv-achievements"].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = ""; });
    removePhoto();
  });
  if (prt) prt.addEventListener("click", function(){
    generateResume();
    // small delay so DOM updates before print
    setTimeout(() => window.print(), 250);
  });
  if (profile) profile.addEventListener("change", handleProfilePic);
  if (remove) remove.addEventListener("click", removePhoto);

  // hide photo initially
  const img = document.getElementById("cv-photo");
  if (img) img.style.display = "none";
});
