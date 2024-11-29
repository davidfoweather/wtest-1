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

function createClusteredBarChart(chartId, chartTitle, data) {
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
        aspectRatio: 3,
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
        createClusteredBarChart('teammatesChart', 'Most Winning Teammates', data);
    });

// Fetch opponents data
fetch("http://97.80.237.197:5000/battles/opponents")
    .then(response => response.json())
    .then(data => {
        createClusteredBarChart('opponentsChart', 'Biggest Rivals', data);
    });