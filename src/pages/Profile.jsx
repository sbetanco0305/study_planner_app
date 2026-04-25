import { useState } from "react";
import { BookOpen, GraduationCap, Heart, Pencil, School, Settings, User } from "lucide-react";
import { useStudyPlanner } from "../context/useStudyPlanner";

export default function Profile() {
  const { profile, settings, updateProfile, toggleSetting } = useStudyPlanner();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    updateProfile(formData);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormData(profile);
    setIsEditing(false);
  }

  return (
    <section className="profile-page figma-profile-page">
      <h1 className="figma-profile-title">Profile</h1>

      <article className="figma-profile-card">
        <div className="figma-profile-top">
          <div className="figma-profile-identity">
            <div className="figma-profile-avatar">
              <User size={46} />
            </div>

            <div>
              {!isEditing ? (
                <>
                  <h2>{profile.username}</h2>
                  <p>{profile.email}</p>
                </>
              ) : (
                <div className="figma-profile-edit-grid compact">
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              )}
            </div>
          </div>

          {!isEditing ? (
            <button className="figma-profile-edit-btn" onClick={() => setIsEditing(true)}>
              <Pencil size={20} />
              Edit Profile
            </button>
          ) : (
            <div className="figma-profile-actions">
              <button className="figma-profile-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="figma-profile-edit-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="figma-profile-details">
            <ProfileRow icon={<School />} label="School" value={profile.school || "Kent State University"} />
            <ProfileRow icon={<BookOpen />} label="Major" value={profile.major || "Computer Science"} />
            <ProfileRow icon={<GraduationCap />} label="Year" value={profile.year || "Junior"} />
            <ProfileRow icon={<Heart />} label="Hobbies" value={profile.hobbies || "Reading, Gaming, Photography"} />
          </div>
        ) : (
          <div className="figma-profile-edit-grid">
            <label>
              School
              <input name="school" value={formData.school} onChange={handleChange} />
            </label>
            <label>
              Major
              <input name="major" value={formData.major} onChange={handleChange} />
            </label>
            <label>
              Year
              <input name="year" value={formData.year} onChange={handleChange} />
            </label>
            <label>
              Hobbies
              <input name="hobbies" value={formData.hobbies} onChange={handleChange} />
            </label>
          </div>
        )}
      </article>

      <article className="figma-settings-card">
        <div className="figma-settings-title">
          <Settings size={28} />
          <h2>Settings</h2>
        </div>

        <SettingRow
          title="Email Notifications"
          description="Receive updates about assignments"
          checked={settings.emailNotifications}
          onChange={() => toggleSetting("emailNotifications")}
        />

        <SettingRow
          title="Study Reminders"
          description="Get notified about upcoming deadlines"
          checked={settings.studyReminders}
          onChange={() => toggleSetting("studyReminders")}
        />

        <SettingRow
          title="Dark Mode"
          description="Switch to dark theme"
          checked={settings.darkMode}
          onChange={() => toggleSetting("darkMode")}
        />
      </article>
    </section>
  );
}

function ProfileRow({ icon, label, value }) {
  return (
    <div className="figma-profile-row">
      <div className="figma-profile-row-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  return (
    <label className="figma-setting-row">
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
