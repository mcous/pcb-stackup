import React from 'react'
import cx from 'classnames'
import {Field} from 'formik'

import {Icon, Label} from '../ui'
import {CoordinateFormat, ZeroSuppression, Units} from '../types'
import {FieldProps} from './types'
import {GAP_FILL_DEFAULT} from './values'

const USE_OUTLINE_LABEL = 'use outline layer for board shape'
const GAP_FILL_LABEL = 'gap fill limit'
const GAP_FILL_UNITS = 'mm'
const OVERRIDE_LABEL = 'override'
const COORD_FORMAT_LABEL = 'integer/decimal coordinate format'
const ZERO_SUPRESSION_LABEL = 'zero suppression'
const UNITS_LABEL = 'units'

const NUMBER_INPUT_STYLE =
  'bb bt-0 br-0 bl-0 bw1 tc near-black b--near-black bg-transparent code f6'

export function UseOutlineInput(props: FieldProps): JSX.Element {
  return (
    <CheckboxInput
      label={USE_OUTLINE_LABEL}
      className="inline-flex v-mid"
      {...props}
    />
  )
}

export function GapFillInput(props: FieldProps): JSX.Element {
  const {field, form} = props
  const value = field.value !== '' ? field.value : GAP_FILL_DEFAULT
  const disabled = !form.values.options.useOutline
  const className = cx('inline-flex items-center pointer h2 v-mid fr', {
    'o-40': disabled,
  })

  return (
    <label className={className}>
      {GAP_FILL_LABEL}
      <input
        {...field}
        type="text"
        className={cx(NUMBER_INPUT_STYLE, 'w3 ml3 mr2')}
        disabled={disabled}
        value={value}
      />
      {GAP_FILL_UNITS}
    </label>
  )
}

type RenderSettingProps<Value> = {
  fieldName: string
  renderName: string
  overridden: boolean
  defaultValue: Value | null | undefined
}

export function CoordFormatFields(
  props: RenderSettingProps<CoordinateFormat>
): JSX.Element {
  const {fieldName, renderName, overridden, defaultValue} = props

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${COORD_FORMAT_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={`${fieldName}[0]`}
        placeholder={defaultValue ? defaultValue[0] : ''}
        type="text"
        className={cx(NUMBER_INPUT_STYLE, 'w2')}
      />
      <span className="dib mh2">.</span>
      <Field
        name={`${fieldName}[1]`}
        placeholder={defaultValue ? defaultValue[1] : ''}
        type="text"
        className={cx(NUMBER_INPUT_STYLE, 'w2')}
      />
    </OverridableField>
  )
}

type RadioGroupProps = FieldProps & {
  options: Array<{value: string; label: string}>
  defaultValue: unknown
}

class RadioGroup extends React.Component<RadioGroupProps> {
  render(): JSX.Element {
    const {field, options, defaultValue} = this.props

    return (
      <>
        {options.map(opt => {
          const value = field.value || defaultValue
          const checked = value === opt.value

          return (
            <Label key={opt.value}>
              <input
                {...field}
                type="radio"
                key={opt.value}
                value={opt.value}
                checked={checked}
                className="clip"
              />
              <span className={cx('dib ph2 ml2', {'bb bw1 b--brand': checked})}>
                {opt.label}
              </span>
            </Label>
          )
        })}
      </>
    )
  }
}

export function ZeroSuppressionFields(
  props: RenderSettingProps<ZeroSuppression>
): JSX.Element {
  const {fieldName, renderName, overridden, defaultValue} = props

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${ZERO_SUPRESSION_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={fieldName}
        component={RadioGroup}
        defaultValue={defaultValue}
        options={[
          {value: 'L', label: 'leading'},
          {value: 'T', label: 'trailing'},
        ]}
      />
    </OverridableField>
  )
}

export function UnitsFields(props: RenderSettingProps<Units>): JSX.Element {
  const {fieldName, renderName, overridden, defaultValue} = props

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${UNITS_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={fieldName}
        component={RadioGroup}
        defaultValue={defaultValue}
        options={[
          {value: 'in', label: 'inches'},
          {value: 'mm', label: 'millimeters'},
        ]}
      />
    </OverridableField>
  )
}

type OverrideCheckboxProps = CheckboxInputProps & {
  defaultValue: unknown
}

class OverrideCheckbox extends React.Component<OverrideCheckboxProps> {
  handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {field, form, defaultValue} = this.props
    const value = event.target.checked ? defaultValue : ''

    form.setFieldValue(field.name, value)
  }

  render(): JSX.Element {
    const field = {
      ...this.props.field,
      checked: !!this.props.field.value,
      onChange: this.handleChange,
      onBlur: () => {},
    }

    return <CheckboxInput {...this.props} field={field} />
  }
}

type OverridableFieldProps = {
  fieldName: string
  label: string
  overridden: boolean
  defaultValue: unknown
  children: React.ReactNode
}

function OverridableField(props: OverridableFieldProps): JSX.Element {
  const {fieldName, label, overridden, defaultValue, children} = props

  return (
    <div className="flex items-center h2 mt1">
      <Field
        name={fieldName}
        component={OverrideCheckbox}
        defaultValue={defaultValue}
        label={label}
        className="flex"
      />
      <div className={cx('flex flex-none ml-auto', {'o-40': !overridden})}>
        {children}
      </div>
    </div>
  )
}

type CheckboxInputProps = FieldProps & {
  label: string
  className?: string
}

function CheckboxInput(props: CheckboxInputProps): JSX.Element {
  const iconName = props.field.value ? 'check-square' : 'square'

  return (
    <Label className={props.className}>
      <input type="checkbox" className="clip" {...props.field} />
      <Icon className="nl2" name={iconName} />
      {props.label}
    </Label>
  )
}
