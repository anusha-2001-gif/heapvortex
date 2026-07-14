function Sidebar() {
  return (
    <div className="sidebar">
      <h3>System Metrics</h3>

      <div className="metric">
        <strong>Heap Usage</strong>
        <p>Loading...</p>
      </div>

      <div className="metric">
        <strong>Thread Count</strong>
        <p>Loading...</p>
      </div>

      <div className="metric">
        <strong>GC Events</strong>
        <p>Loading...</p>
      </div>

      <div className="metric">
        <strong>CPU Usage</strong>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Sidebar;