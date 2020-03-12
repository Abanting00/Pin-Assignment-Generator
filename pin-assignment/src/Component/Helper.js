import de2 from '../Data/de2.json';

export const pinToText = (pins) => {
    let pinText = "To, Location\n";

    for (const key in pins) {
        if (de2.hasOwnProperty(key)) {
            pinText += `\n${pins[key]}, ${de2[key]}`
        }
    }

    return pinText;
}

export const Logout = () => {
	localStorage.removeItem('user');
}

// Cache stuff?
export const isloggedIn = () => {
	let user = JSON.parse(localStorage.getItem('user'));
	return (user && user.token);
}

export const getUserID = () => {
	let user = JSON.parse(localStorage.getItem('user'));
	return user.user._id;
}

export const getUserRole = () => {
	let user = JSON.parse(localStorage.getItem('user'));
	return user.user.role;
}

export const getUser = () => {
	let user = JSON.parse(localStorage.getItem('user'));
	return user.user;
}