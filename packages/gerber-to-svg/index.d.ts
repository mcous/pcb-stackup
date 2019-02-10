// Type definitions for gerber-to-svg 4.0
// Project: https://github.com/tracespace/tracespace
// Definitions by: Mike Cousins <https://mike.cousins.io>

/// <reference types="node" />

import {Parser, Options as ParserOptions} from 'gerber-parser'
import {Plotter, Options as PlotterOptions} from 'gerber-plotter'
import {ViewBox} from 'viewbox'

declare function gerberToSvg<NodeType = string>(
  gerber: gerberToSvg.GerberSource,
  options?:
    | string
    | gerberToSvg.Options<NodeType>
    | gerberToSvg.DoneCallback<NodeType>,
  done?: gerberToSvg.DoneCallback<NodeType>
): gerberToSvg.Converter<NodeType>

declare namespace gerberToSvg {
  function clone<NodeType = string>(
    converter: Converter<NodeType>
  ): ConverterResult<NodeType>

  function render<NodeType = string>(
    converter: ConverterResult<NodeType>,
    attributes: object | string,
    createElement?: CreateElement<NodeType>,
    objectMode?: ObjectMode<NodeType>
  ): NodeType

  type GerberSource = string | Buffer | NodeJS.ReadableStream

  type ObjectMode<NodeType = string> = NodeType extends string ? false : true

  interface CreateElement<NodeType = string> {
    (tag: string, attributes: object, children: Array<NodeType>): NodeType
  }

  interface Converter<NodeType = string>
    extends NodeJS.ReadableStream,
      ConverterResult<NodeType> {
    parser: Parser
    plotter: Plotter
  }

  interface ConverterResult<NodeType = string> {
    id: string
    attributes: object
    defs: Array<NodeType>
    layer: Array<NodeType>
    viewBox: ViewBox
    width: number
    height: number
    units: 'in' | 'mm'
  }

  interface Options<NodeType = string> extends ParserOptions, PlotterOptions {
    id?: string
    attributes?: object
    createElement?: CreateElement<NodeType>
    objectMode?: ObjectMode<NodeType>
  }

  interface DoneCallback<NodeType = string> {
    (error: Error, result: NodeType): void
  }
}

export = gerberToSvg
