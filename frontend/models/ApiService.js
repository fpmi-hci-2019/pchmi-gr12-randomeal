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

    setBoardIsFavourite(boardId) {
        console.log("Set isFavourite for board " + boardId);
        return this.apiClient.put('boards/' + boardId + '/fav');
    }

    getBoardIsFavourite(boardId) {
        console.log("Get isFavourite for board " + boardId);
        return this.apiClient.get('boards/' + boardId + '/fav');
    }

    setDishIsFavourite(dishId) {
        console.log("Set isFavourite for dish " + dishId);
        return this.apiClient.put('dishes/' + dishId + '/fav');
    }

    getDishIsFavourite(dishId) {
        console.log("Get isFavourite for dish " + dishId);
        return this.apiClient.get('dishes/' + dishId + '/fav');
    }

    deleteBoard(boardId) {
        console.log("Delete board " + boardId);
        return this.apiClient.delete('boards/' + boardId + '/fav');
    }

    getBoard(boardId) {
        console.log('Get board by id ' + boardId);
        return this.apiClient.get('boards/' + boardId)
    }

    getAllDishes() {
        console.log('Get all dishes');
        return this.apiClient.get('dishes/');
    }

    getDishById(dishId) {
        console.log('Get dish by id: ' + dishId);
        return this.apiClient.get('dishes/' + dishId);
    }

    addDishOnBoard(boardId, dishId) {
        console.log('Add dish ' + dishId + ' on the board ' + boardId);
        return this.apiClient.post('boards/' + boardId + '/dishes/' + dishId);
    }

    deleteDishFromBoard(boardId, dishId) {
        console.log('Delete dish ' + dishId + ' from the board ' + boardId);
        return this.apiClient.delete('boards/' + boardId + '/dishes/' + dishId);
    }
}
