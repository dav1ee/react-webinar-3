import StoreModule from '../module';

class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: '',
      user: {},
      isLoading: false,
      isSuccess: false,
      isInitialAuth: true,
      isAuth: false,
      error: null,
    };
  }

  /**
   * @param {{ login: string, password: string }} data
   */
  async login(data) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      isSuccess: false,
      isAuth: false,
      error: null,
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const json = await response.json();

      this.setState({
        token: json.result.token,
        user: json.result.user,
        isLoading: false,
        isSuccess: true,
        isAuth: true,
        error: null,
      });

      localStorage.setItem('token', json.result.token);
    } catch (e) {
      this.setState({
        ...this.initState(),
        error: e.message,
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      isLoading: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      this.setState({
        ...this.initState(),
      });

      localStorage.removeItem('token');
    } catch (e) {
      this.setState({
        ...this.getState(),
        isLoading: false,
        isSuccess: false,
        error: e.message,
      });
    }
  }

  async authenticate() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.setState({
      ...this.getState(),
      isLoading: true,
      isSuccess: false,
      isInitialAuth: true,
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
        ...this.getState(),
        user: json.result,
        isLoading: false,
        isSuccess: true,
        isInitialAuth: false,
        error: null,
      });
    } catch (e) {
      this.setState({
        ...this.initState(),
        error: e.message,
      });
    }
  }
}

export default AuthState;
