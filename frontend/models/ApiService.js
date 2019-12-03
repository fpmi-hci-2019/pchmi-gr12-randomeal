import {ApiClient} from './ApiClient';

/** A wrapper class to construct, send and handle server queries. */
export class ApiService {
    constructor() {
        this.apiClient = new ApiClient();
    }

    register(gender, birthDate, weight, height, physicalActivity, targetWeight) {
        return this.apiClient.post('users/register', {
            gender,
            birthDate,
            weight,
            height,
            physicalActivity,
            targetWeight,
        });
    }

    login(email, password) {
        console.log("Sending request to users/login");
        return this.apiClient.post('users/login', {
            email,
            password
        })
    }

    getAllBoardsForUser(userId) {
        console.log("Request all boards for user");
        return this.apiClient.get('boards?userId=' + userId);
    }

    getAllFavBoardsForUser(userId) {
        console.log("Request all fav boards for user");
        return this.apiClient.get('boards?userId=' + userId + '&filterBy=fav');
    }

    setIsFavourite(boardId) {
        console.log("Set isFavourite for board " + boardId);
        return this.apiClient.put('boards/' + boardId + '/fav');
    }

    deleteBoard(boardId) {
        console.log("Delete board " + boardId);
        return this.apiClient.delete('boards/' + boardId + '/fav');
    }
}
