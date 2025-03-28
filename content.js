console.log("Content script is running!");

// Inject sidebar if not already injected
if (!document.getElementById("virtualSidebar")) {
  console.log("Injecting virtual sidebar...");

  // Create the sidebar
  const sidebar = document.createElement("div");
  sidebar.id = "virtualSidebar";
  sidebar.innerHTML = `
        <div id="sidebarHeader">
            <span>🔍 Virtual Sidebar</span>
            <button id="closeSidebar">&times;</button>
        </div>
        <div id="sidebarContent">
            <p>Hello! This is your custom sidebar.</p>
            <button id="testButton">Click me!</button>
        </div>
    `;

  // Create the main content wrapper

  // Move the content of the page into the contentWrapper
  const bodyContent = document.body.innerHTML;
  document.body.innerHTML = ""; // Clear the body
  const contentWrapper = document.createElement("div");
  contentWrapper.id = "contentWrapper";
  document.body.appendChild(contentWrapper);
  contentWrapper.innerHTML = bodyContent;

  // Apply grid layout to the body (main content + sidebar)
  document.body.style.display = "grid";
  document.body.style.gridTemplateColumns = "300px 1fr"; // Sidebar + content
  document.body.style.transition = "grid-template-columns 0.3s ease-in-out";

  // Apply styles to the sidebar
  sidebar.style.position = "fixed";
  sidebar.style.top = "0";
  sidebar.style.left = "0"; // Sidebar on the left side
  sidebar.style.width = "300px";
  sidebar.style.height = "100vh";
  sidebar.style.background = "white";
  sidebar.style.boxShadow = "3px 0 10px rgba(0,0,0,0.3)";
  sidebar.style.borderRight = "2px solid #007bff";
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.zIndex = "10000";
  sidebar.style.padding = "10px";
  sidebar.style.fontFamily = "Arial, sans-serif";
  sidebar.style.transition = "left 0.3s ease-in-out";

  // Add the sidebar to the body
  document.body.appendChild(sidebar);

  // Apply styles to the contentWrapper (content section)
  contentWrapper.style.transition = "margin-left 0.3s ease-in-out"; // Smooth transition for content shift
  contentWrapper.style.paddingLeft = "0"; // Initially no space for sidebar

  // Toggle the sidebar open and close
  const openSidebar = () => {
    sidebar.style.left = "0"; // Sidebar slides in from the left
    contentWrapper.style.paddingLeft = "300px"; // Push content to the right (make space for sidebar)
  };

  const closeSidebar = () => {
    sidebar.style.left = "-300px"; // Sidebar slides out
    contentWrapper.style.paddingLeft = "0"; // Restore content position
  };

  // Close the sidebar on button click
  document
    .getElementById("closeSidebar")
    .addEventListener("click", closeSidebar);

  // Example action: Click event inside the sidebar
  document.getElementById("testButton").addEventListener("click", () => {
    alert("Button clicked inside the sidebar!");
  });

  // Automatically open the sidebar (or trigger by some event like a button)
  openSidebar(); // You can change this to a toggle button if desired
}
