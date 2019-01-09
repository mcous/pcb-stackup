import React from 'react'
import {Formik, Form, Field} from 'formik'

import {connect, updateBoard, deleteBoard, Dispatch} from '../state'
import {BoardRender} from '../types'
import {TitledSection, SectionColumnLeft, SectionColumnRight} from '../ui'
import {getDefaultLayerOptions, orderLayers} from '../layers'
import {Values, FormProps} from './types'
import {boardRenderToValues, valuesToBoardUpdate} from './values'

import BoardUrl from './BoardUrl'
import SettingsButtons from './SettingsButtons'
import {BoardNameInput} from './name'
import {ColorPresetsField, ColorFields} from './color'
import {
  UseOutlineInput,
  GapFillInput,
  CoordFormatFields,
  ZeroSuppressionFields,
  UnitsFields,
} from './render'
import {
  LayerList,
  LayerItem,
  LayerTypeSelect,
  LayerSideSelect,
  LayerColorInput,
} from './layers'

type SettingsFormProps = {
  className: string
  board: BoardRender
  close: () => void
  dispatch: Dispatch
}

class SettingsForm extends React.Component<SettingsFormProps> {
  handleSubmit = (values: Values) => {
    const {board, dispatch, close} = this.props

    dispatch(updateBoard(board.id, valuesToBoardUpdate(values)))
    close()
  }

  handleDelete = () => {
    this.props.dispatch(deleteBoard(this.props.board.id))
    this.props.close()
  }

  render(): JSX.Element {
    const {board, close, className} = this.props
    const {sourceUrl, layers} = board
    const defaultGerberOptions = getDefaultLayerOptions(layers, 'gerber')
    const defaultDrillOptions = getDefaultLayerOptions(layers, 'drill')

    return (
      <Formik
        initialValues={boardRenderToValues(board)}
        onSubmit={this.handleSubmit}
        onReset={close}
        render={(formProps: FormProps) => (
          <Form className={className}>
            <SettingsButtons delete={this.handleDelete} />
            <Field name="name" component={BoardNameInput} />
            {sourceUrl && <BoardUrl url={sourceUrl} />}
            <TitledSection title="colors">
              <SectionColumnLeft>
                <ColorPresetsField fieldName="options.color" />
              </SectionColumnLeft>
              <SectionColumnRight>
                <ColorFields fieldName="options.color" />
              </SectionColumnRight>
            </TitledSection>
            <TitledSection title="render options">
              <div>
                <Field name="options.useOutline" component={UseOutlineInput} />
                <Field name="options.outlineGapFill" component={GapFillInput} />
              </div>
              <CoordFormatFields
                fieldName="gerberOptions.coordinateFormat"
                renderName="gerber"
                defaultValue={defaultGerberOptions.coordinateFormat}
                overridden={!!formProps.values.gerberOptions.coordinateFormat}
              />
              <ZeroSuppressionFields
                fieldName="gerberOptions.zeroSuppression"
                renderName="gerber"
                defaultValue={defaultGerberOptions.zeroSuppression}
                overridden={!!formProps.values.gerberOptions.zeroSuppression}
              />
              <UnitsFields
                fieldName="gerberOptions.units"
                renderName="gerber"
                defaultValue={defaultGerberOptions.units}
                overridden={!!formProps.values.gerberOptions.units}
              />
              <CoordFormatFields
                fieldName="drillOptions.coordinateFormat"
                renderName="drill"
                defaultValue={defaultDrillOptions.coordinateFormat}
                overridden={!!formProps.values.drillOptions.coordinateFormat}
              />
              <ZeroSuppressionFields
                fieldName="drillOptions.zeroSuppression"
                renderName="drill"
                defaultValue={defaultDrillOptions.zeroSuppression}
                overridden={!!formProps.values.drillOptions.zeroSuppression}
              />
              <UnitsFields
                fieldName="drillOptions.units"
                renderName="drill"
                defaultValue={defaultDrillOptions.units}
                overridden={!!formProps.values.drillOptions.units}
              />
            </TitledSection>
            <TitledSection title="layers">
              <LayerList>
                {layers
                  .slice(0)
                  .sort(orderLayers)
                  .map(ly => (
                    <LayerItem key={ly.id} filename={ly.filename}>
                      <Field
                        id={ly.id}
                        name={`layers.${ly.id}.type`}
                        component={LayerTypeSelect}
                      />
                      <Field
                        id={ly.id}
                        name={`layers.${ly.id}.side`}
                        component={LayerSideSelect}
                      />
                      <Field
                        id={ly.id}
                        name={`layers.${ly.id}.color`}
                        component={LayerColorInput}
                      />
                    </LayerItem>
                  ))}
              </LayerList>
            </TitledSection>
          </Form>
        )}
      />
    )
  }
}

export default connect<SettingsFormProps>(SettingsForm)
