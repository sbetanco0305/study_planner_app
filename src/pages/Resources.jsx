import { useEffect, useState } from "react";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "Website",
    link: "",
    description: "",
  });

  useEffect(() => {
    const savedResources = localStorage.getItem("studyResources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studyResources", JSON.stringify(resources));
  }, [resources]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a resource title.");
      return;
    }

    const newResource = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      link: formData.link,
      description: formData.description,
      dateAdded: new Date().toLocaleDateString(),
    };

    setResources([newResource, ...resources]);

    setFormData({
      title: "",
      type: "Website",
      link: "",
      description: "",
    });
  }

  function deleteResource(id) {
    const updatedResources = resources.filter((resource) => resource.id !== id);
    setResources(updatedResources);
  }

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>Study Resources</h1>
        <p>Save helpful links, videos, notes, and materials for your classes.</p>
      </div>

      <form className="resource-form" onSubmit={handleSubmit}>
        <h2>Add New Resource</h2>

        <label>Resource Title</label>
        <input
          type="text"
          name="title"
          placeholder="Example: React Tutorial"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Resource Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option>Website</option>
          <option>Video</option>
          <option>Notes</option>
          <option>Book</option>
          <option>Other</option>
        </select>

        <label>Link</label>
        <input
          type="text"
          name="link"
          placeholder="https://example.com"
          value={formData.link}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Briefly describe what this resource is for..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Resource</button>
      </form>

      <div className="resources-list">
        <h2>Saved Resources</h2>

        {resources.length === 0 ? (
          <p className="empty-message">No resources added yet.</p>
        ) : (
          resources.map((resource) => (
            <div className="resource-card" key={resource.id}>
              <div className="resource-card-header">
                <h3>{resource.title}</h3>
                <span>{resource.type}</span>
              </div>

              <p>{resource.description || "No description provided."}</p>

              {resource.link && (
                <a href={resource.link} target="_blank" rel="noreferrer">
                  Open Resource
                </a>
              )}

              <div className="resource-footer">
                <small>Added: {resource.dateAdded}</small>
                <button onClick={() => deleteResource(resource.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Resources;