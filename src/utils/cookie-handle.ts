export const getCookie = (cname: string) : string => {
    const strCookie : string = document.cookie;
    console.log(strCookie);
    const cookies : string[] = strCookie.split(';');
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
        const cookie : string = cookies[i];
        const name : string = cookie.slice(0, cookie.indexOf('='));
        const value : string = cookie.slice(cookie.indexOf('=') + 1);
        if (name.trim() === cname) return value;
    }
    return "";
}

  