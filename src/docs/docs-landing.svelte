<script>
    let value = "empty"; 
    const render = (dirs) => {
        value = JSON.stringify(dirs);
    };
    fetch('../dir-structure.json', {
        method: 'GET',
        headers: {
            'Permissions-Policy': 'interest-cohort=()'
        }
    })
        .then (res  => res.json())
        .catch(console.error)
        .then (data => render(data))
        .catch(console.error);
</script>
<title>Welcome to the CBLOS Docs!</title>
<h1>Welcome to the CBLOS Docs!</h1>
<p>dir-structure is: {value}</p>