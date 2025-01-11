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