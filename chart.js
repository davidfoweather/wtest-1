// Fetch data from the Flask API
fetch("http://97.80.237.197:5000/battles/winloss")
    .then(response => response.json())
    .then(data => {
        // Parse victories and defeats
        const victories = data.victories;
        const defeats = data.defeats;

        // Create the bar chart
        const ctx = document.getElementById('winLossChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Victories', 'Defeats'],
                datasets: [{
                    label: 'Battle Outcomes',
                    data: [victories, defeats],
                    backgroundColor: ['green', 'red'],
                    borderColor: ['darkgreen', 'darkred'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 0.5,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Total Wins/Losses'
                    },
                    chartAreaBorder: {
                        borderColor: 'red',
                        borderWidth: 200
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function createClusteredBarChart(chartId, chartTitle, data, aspectratio) {
  const labels = data.map(player => player.name); // Player names
  const wins = data.map(player => player.wins);  // Wins
  const losses = data.map(player => player.losses); // Losses
  
  new Chart(document.getElementById(chartId).getContext('2d'), {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [
              {
                  label: 'Wins',
                  data: wins,
                  backgroundColor: 'green'
              },
              {
                  label: 'Losses',
                  data: losses,
                  backgroundColor: 'red'
              }
          ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: aspectratio,
          plugins: {
              title: {
                  display: true,
                  text: chartTitle
              },
          },
          scales: {
              x: {
                  stacked: false
              },
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

  // Fetch teammates data
fetch("http://97.80.237.197:5000/battles/teammates")
    .then(response => response.json())
    .then(data => {
        createClusteredBarChart('teammatesChart', 'Most Winning Teammates', data, 3);
    });

// Fetch opponents data
fetch("http://97.80.237.197:5000/battles/opponents")
    .then(response => response.json())
    .then(data => {
        createClusteredBarChart('opponentsChart', 'Biggest Rivals', data, 2);
    });

// Function to render the chart
function renderChart(data) {
    const labels = data.map(row => row[0]); // Extract mode names
    const wins = data.map(row => row[1]);  // Extract win counts
    const losses = data.map(row => row[2]); // Extract loss counts
    console.log(labels,wins,losses)
    new Chart(document.getElementById('modesChart').getContext('2d'), {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [
            {
            label: 'Wins',
            backgroundColor: 'green',
            data: wins
            },
            {
            label: 'Losses',
            backgroundColor: 'red',
            data: losses
            }
        ]
        },
        options: {
        responsive: true,
        scales: {
            x: {
            beginAtZero: true
            },
            y: {
            beginAtZero: true
            }
        }
        }
    });
    }



fetch('http://97.80.237.197:5000/gamemodes')
.then(response => {
    // Ensure the response is successful
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('API Data:', data);
    renderChart(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});


async function fetchData() {
    try {
        const response = await fetch('http://97.80.237.197:5000/starplayer'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json(); // Parse JSON data
        return jsonData[0]; // Extract the array (e.g., [1163, 61, 1217, 525])
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Handle errors gracefully
    }
}


async function createPieChart() {
    const data = await fetchData();
    if (!data) {
        console.error('No data available to create the chart.');
        return;
    }

    const labels = ["Win and Star Player", "Loss and Star Player", "Win without Star Player", "Loss without Star Player"];

    const ctx = document.getElementById('starplayerChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(216, 202, 0, 0.93)',
                    'rgba(166, 168, 46, 0.6)',
                    'rgba(47, 219, 0, 0.6)',
                    'rgba(228, 0, 0, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

// Call the function to fetch data and create the chart
createPieChart();