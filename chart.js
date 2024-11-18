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
                plugins: {
                    legend: {
                        display: false
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
          plugins: {
              title: {
                  display: true,
                  text: chartTitle
              }
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
        createClusteredBarChart('teammatesChart', 'Top 20 Teammates Wins/Losses', data);
    });

// Fetch opponents data
fetch("http://97.80.237.197:5000/battles/opponents")
    .then(response => response.json())
    .then(data => {
        createClusteredBarChart('opponentsChart', 'Top 20 Opponents Wins/Losses', data);
    });
