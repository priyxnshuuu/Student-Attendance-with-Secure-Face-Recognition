export const getCookie = (name: string) => {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (const element of cookies) {
      let cookie = element.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
