var copyables = document.getElementsByClassName('copyable');

for (const copyable of copyables) {
  copyable.addEventListener('click', function(event) {
    navigator.clipboard.writeText(copyable.textContent)
        .then(() => {
          // Success!
        })
        .catch(err => {
          console.log('Something went wrong', err);
        });
  });
}
