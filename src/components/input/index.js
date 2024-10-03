import { memo, useCallback, useLayoutEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeHandler = useCallback(
    value => {
      props.onChange(value, props.name);
    },
    [props.onChange, props.name],
  );

  const onChangeDebounce = useCallback(debounce(onChangeHandler, 600), [onChangeHandler]);

  // Обработчик изменений в поле
  const onChange = event => {
    const newValue = event.target.value;
    setValue(newValue);

    if (props.shouldDebounce) {
      onChangeDebounce(newValue);
    } else {
      onChangeHandler(newValue);
    }
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');

  const { wrapper: Wrapper = Fragment } = props;

  return (
    <Wrapper>
      {props.label && <label className={cn('label')}>{props.label}</label>}
      <input
        className={cn({ theme: props.theme })}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
}

Input.propTypes = {
  wrapper: PropTypes.elementType,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  shouldDebounce: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  shouldDebounce: true,
};

export default memo(Input);
