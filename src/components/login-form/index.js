import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Input from '../input';

import './style.css';

function LoginForm(props) {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const handleInputChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.login || !formData.password) return;

    props.onSubmit(formData);
  };

  const cn = bem('LoginForm');

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn('title')}>{props.title}</h3>
      <Input
        wrapper={'div'}
        name={'login'}
        label={props.labels.login}
        type="text"
        value={formData.login}
        onChange={handleInputChange}
        shouldDebounce={false}
      />
      <Input
        wrapper={'div'}
        name={'password'}
        label={props.labels.password}
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        shouldDebounce={false}
      />
      {props.error && <div className={cn('error')}>{props.error}</div>}
      <button type="submit" disabled={props.isSubmitting}>
        {props.labels.onSubmit}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string,
    onSubmit: PropTypes.string,
  }),
  error: PropTypes.string,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default memo(LoginForm);
