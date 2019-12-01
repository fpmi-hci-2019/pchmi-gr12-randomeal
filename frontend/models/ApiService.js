import { ApiClient } from './ApiClient';

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
}
