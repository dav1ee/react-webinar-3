import StoreModule from '../module';

class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      isLoading: false,
      isSuccess: false,
      error: null,
    };
  }

  async load() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.setState({
      ...this.getState(),
      isLoading: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const json = await response.json();

      this.setState({
        user: json.result,
        isLoading: false,
        isSuccess: true,
        error: null,
      });
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          isLoading: false,
          isSuccess: false,
          error: e.message,
        },
        'Ошибка при авторизации',
      );
    }
  }
}

export default UserState;
