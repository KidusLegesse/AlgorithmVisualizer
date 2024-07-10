# Algorithm Visualizer Website ⛵ ⚓

🚤[Link to the website.](https://kiduslegesse.github.io/AlgorithmVisualizer/)

🗺️**Website description:** A tool that can help visualize four different graph traversal algorithms (Dijkstra's , Breadth-First Search (BFS), Depth-First Search (DFS), and A*) through simulating a boat ⛵ in the ocean attempting to find the best path to get to the the treasure :trophy:.

🌊**Features:** Users can click on any open space in the ocean/map to place icebergs 🏔️❄️ which are obstacles for the boat. Clicking on an iceberg that is already placed will result in removing that particular iceberg. Along with that there is a drop down menu with all four of the algorithm options and once an algorithm is chosen there is a side panel (which can be toggled to be shown or hidden) that displays the exact implementation the algorithm is running. Furthermore once the user runs the simulation of an algorithm the path it found will be highlighted on the map with its unique color to help distinguish different paths (Dijkstra's 🟠, BFS 🟣, DFS 🔴, A* 🟢). 

🗝️**Explanation of each button:**

:twisted_rightwards_arrows:Randomize - Places the treasure and the boat on random points on the map (maintains a distance of at least 10 nodes between the two).

:rewind:Reset - Places the treasure and boat back to their original positions.

:twisted_rightwards_arrows:Clear IceBergs - Removes all of the IceBergs that were placed.

:no_entry_sign:Clear Path - Removes the highlighted path of previous algorithms to clean up the map.

❌Clear All - A combination of the other two clear buttons (clears everything of the map).

:runner:Run - Starts the visualization of the selected algorithm.

:vertical_traffic_light:Stop - Run button transitions to a stop button once the algorithm is being visualized so clicking to will stop the simulation.

🔧🔩**Libraries and Tools:** NodeJs, React, JavaScript, HTML, CSS, react-codemirror2, GitHub pages.

:construction:**Additional information:**
While the algorithm is running unless the user clicks the stop button you cannot place any Icebergs, select another algorithm, and click any button aside from the Stop button. Also there is a swaying animation applied to the boat and IceBergs which also have a rippling animation to give the sense that they are floating in the water.

:art:**User Interface:**

<img width="1440" alt="Website Interface Screenshot" src="https://github.com/KidusLegesse/AlgorithmVisualizer/Assets/WebsiteDemo">
