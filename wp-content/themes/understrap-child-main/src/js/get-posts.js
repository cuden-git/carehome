const getPosts =  async (postIDs) => {

  let response = await fetch(themeData.restURL + 'quantum-care/v1/location-posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        post_ids: postIDs,
    }),
  });

  if(!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  let json = await response.json();
  console.log(json);
  
  return json;
}

export default getPosts;
