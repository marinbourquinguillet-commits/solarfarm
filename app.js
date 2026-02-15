const roleSelect = document.getElementById('roleSelect');
const dashboard = document.getElementById('dashboardButtons');
const panel = document.getElementById('contentPanel');
const welcome = document.getElementById('welcome');

const actionsByRole = {
  worker: [
    ['Start/End Shift', renderTimesheet],
    ['Vehicle Pre-start', renderVehicle],
    ['Report Issue', renderIssue],
    ['Sites & Maps', renderSites],
    ['Documents', renderDocs],
    ['Messages', renderMessages],
    ['Team Board', renderBoard],
    ['My Timesheets', renderTimesheetHistory],
  ],
  leader: [
    ['Start/End Shift', renderTimesheet],
    ['Team Daily Report', renderProduction],
    ['Messages', renderMessages],
    ['Team Board', renderBoard],
    ['Documents', renderDocs],
    ['Report Issue', renderIssue],
  ],
  supervisor: [
    ['Approve Timesheets', renderApproveTimesheets],
    ['Vehicles Needing Attention', renderVehicleRepairs],
    ['View Incidents', renderIssueList],
    ['Manage Team Board', renderBoard],
    ['Messages', renderMessages],
    ['Sites & Maps', renderSites],
  ],
};

const sample = {
  sites: ['Wagga Solar Zone 1', 'Dubbo Trackers East', 'Moree Stage B'],
  vehicles: ['UTE-14', 'LV-03', 'Forklift-2'],
  docs: ['Site Map Rev 3.pdf', 'SWMS Trackers.pdf', 'Client Access Rules.pdf'],
};

function setButtons() {
  const role = roleSelect.value;
  welcome.innerText = `Welcome, ${role[0].toUpperCase() + role.slice(1)}`;
  dashboard.innerHTML = '';
  actionsByRole[role].forEach(([name, fn]) => {
    const btn = document.createElement('button');
    btn.innerText = name;
    btn.onclick = fn;
    dashboard.appendChild(btn);
  });
}

function render(html) {
  panel.innerHTML = html;
}

function renderTimesheet() {
  render(`
    <h2>Timesheet</h2>
    <p class="small">Use QR deep link or choose site manually.</p>
    <div class="row">
      <label>Site<select><option>${sample.sites.join('</option><option>')}</option></select></label>
      <label>Break (minutes)<input type="number" value="30" /></label>
    </div>
    <div class="row">
      <button onclick="alert('Shift started')">Start Shift</button>
      <button class="secondary" onclick="alert('Shift ended. Total hours auto-calculated')">End Shift</button>
    </div>
  `);
}

function renderTimesheetHistory() {
  render(`
    <h2>My Timesheets</h2>
    <div class="list">
      <div class="item">12 Feb · Wagga Solar Zone 1 · 7.5h</div>
      <div class="item">11 Feb · Wagga Solar Zone 1 · 8.0h</div>
    </div>
  `);
}

function renderVehicle() {
  render(`
    <h2>Vehicle Pre-start</h2>
    <p class="small">QR code opens this form for a specific vehicle.</p>
    <label>Vehicle<select><option>${sample.vehicles.join('</option><option>')}</option></select></label>
    <div class="row">
      <label>Tyres<select><option>OK</option><option>Needs repair</option></select></label>
      <label>Lights<select><option>OK</option><option>Needs repair</option></select></label>
    </div>
    <label>Comments<textarea rows="3" placeholder="Damage details..."></textarea></label>
    <div class="row">
      <button onclick="alert('Pre-start submitted')">Submit Pre-start</button>
      <button class="warn" onclick="alert('Photo upload placeholder in MVP')">Add Photo</button>
    </div>
  `);
}

function renderIssue() {
  render(`
    <h2>Report Incident / Issue</h2>
    <div class="row">
      <label>Type<select><option>Safety hazard</option><option>Near miss</option><option>Damage</option></select></label>
      <label>Severity<select><option>Low</option><option>Medium</option><option>High</option></select></label>
    </div>
    <label>Description<textarea rows="4"></textarea></label>
    <button onclick="alert('Issue submitted and visible to supervisors')">Submit Report</button>
  `);
}

function renderIssueList() {
  render(`
    <h2>Incidents / Issues</h2>
    <div class="list">
      <div class="item"><strong>Hydraulic leak</strong><br/><span class="badge open">Open</span> · Moree Stage B</div>
      <div class="item"><strong>Loose barrier mesh</strong><br/><span class="badge warn">In progress</span> · Dubbo East</div>
    </div>
  `);
}

function renderDocs() {
  render(`
    <h2>Documents (PDF Hub)</h2>
    <label>Search<input placeholder="site map"/></label>
    <div class="list">${sample.docs.map((d) => `<div class="item">${d}</div>`).join('')}</div>
  `);
}

function renderMessages() {
  render(`
    <h2>Messages & Groups</h2>
    <div class="list">
      <div class="item">General announcements</div>
      <div class="item">Zone 1 team chat</div>
      <div class="item">Mechanics / Maintenance</div>
    </div>
    <label>New message<textarea rows="3" placeholder="Type message..."></textarea></label>
    <button onclick="alert('Message posted')">Send</button>
  `);
}

function renderBoard() {
  render(`
    <h2>Daily Team Board</h2>
    <div class="item">
      <strong>Today</strong><br/>
      Team 1 · Leader: Joel · Zone 1 · Tracker alignment
    </div>
    <div class="item">
      <strong>Tomorrow</strong><br/>
      Team 2 · Leader: Emma · Zone 2 · Cable pull
    </div>
  `);
}

function renderSites() {
  render(`
    <h2>Sites & Maps</h2>
    <div class="list">
      <div class="item">Wagga Solar Zone 1<br/><span class="small">-35.108, 147.368</span></div>
      <div class="item">Dubbo Trackers East<br/><span class="small">-32.256, 148.619</span></div>
    </div>
  `);
}

function renderProduction() {
  render(`
    <h2>Team Daily Production Report</h2>
    <div class="row">
      <label>Team<select><option>Team 1</option><option>Team 2</option></select></label>
      <label>Trackers completed<input type="number" value="12"/></label>
    </div>
    <label>Issues / blockers<textarea rows="3"></textarea></label>
    <button onclick="alert('One report per team per day (enforced in DB schema)')">Submit Report</button>
  `);
}

function renderApproveTimesheets() {
  render(`
    <h2>Approve Timesheets</h2>
    <div class="item">A. Worker · Wagga · 7.5h <button onclick="alert('Approved')">Approve</button></div>
    <div class="item">B. Worker · Dubbo · 8.0h <button class="danger" onclick="alert('Rejected')">Reject</button></div>
  `);
}

function renderVehicleRepairs() {
  render(`
    <h2>Vehicles Needing Attention</h2>
    <div class="list">
      <div class="item">UTE-14 · <span class="badge open">Needs repair</span> · Tyre damage</div>
      <div class="item">Forklift-2 · <span class="badge open">Needs repair</span> · Light not working</div>
    </div>
  `);
}

roleSelect.onchange = setButtons;
setButtons();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
