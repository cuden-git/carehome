const getPosts =  async () => {
  let response = await fetch(themeData.restURL + 'quantum-care/v1/location-posts');

  if(!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  let json = await response.json();
  console.log(json);
  
  return json
}

export default getPosts;
