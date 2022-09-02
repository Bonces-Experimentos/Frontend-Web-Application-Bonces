import http from './http-common'

class ScheduleService {
    getById(id) {
        return http.get(`/schedule/${ id }`);
    }

    create(userId, data) {
        return http.post(`/schedule`, data, { params: { userId: userId } });
    }

    update(id, data) {
        return http.put(`/schedule/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/schedule/${ id }`);
    }
}

export default new ScheduleService;