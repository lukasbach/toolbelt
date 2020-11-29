import * as React from 'react';
import { ToolContainer } from '../../smoothui/ToolContainer';
import { TypedSortList } from '../../smoothui/SortList';
import cxs from 'cxs';
import { darken, lighten, px } from '../../smoothui/common';
import { ChromePicker, RGBColor } from 'react-color';
import { useState } from 'react';
import Color from 'color';

const toRgbaObject = (col: Color) => ({ r: col.red(), g: col.gray(), b: col.blue(), a: col.alpha() });
const asRgba = (color: RGBColor) => `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a ?? 1})`;

const ColorSet: React.FC<{
  colors: RGBColor[];
  title: string;
  onChange: (color: RGBColor) => any;
}> = props => (
  <>
    <h4 className={cxs({ margin: 0 })} children={props.title} />
    <div className={cxs({
      display: 'flex'
    })}>
      {
        props.colors.map(color => (
          <div
            className={cxs({
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              height: px(80),
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              padding: px(0, 0, 8, 8),
              transition: '.1s all ease',
              cursor: 'pointer',
              ':hover': {
                transform: 'scale(.8)',
                borderRadius: px(8)
              }
            })}
            onClick={() => props.onChange(color)}
          >
            <div>{ Color(asRgba(color)).hex() }</div>
          </div>
        ))
      }
    </div>
  </>
)

export const ColorPickerTool: React.FC<{}> = props => {
  const [color, setColor] = useState<RGBColor>({ r: 50, g: 100, b: 200, a: 1 });
  const colorAsRgba = asRgba(color);
  const isDark = Color(colorAsRgba).isDark();

  return (
    <div className={cxs({
      height: '100%',
      ' *, a': {
        color: isDark ? 'white !important' : '#333 !important'
      },
      ' .chrome-picker *, .chrome-picker a': {
        color: 'black !important'
      }
    })}>
      <ToolContainer
        theme={{ color: isDark ? lighten(colorAsRgba, .3) : darken(colorAsRgba, .3), background: [colorAsRgba, colorAsRgba] }}
        showHeader={true}
        showTitle={true}
        toolKey="colorpicker"
      >
        <div className={cxs({
          display: 'flex',
          flexWrap: 'wrap'
        })}>
          <div className={cxs({
            width: px(480),
          })}>
            <ChromePicker
              color={color}
              onChange={c => setColor(c.rgb)}
            />
          </div>
          <div className={cxs({
            flexGrow: 1
          })}>
            <ColorSet
              title="Changes in lighteness"
              colors={[-.5, -.4, -.3, -.2, -.1, 0, .1, .2, .3, .4, .5].map(perc => Color(colorAsRgba).lighten(perc)).map(col => toRgbaObject(col))}
              onChange={setColor}
            />
            <ColorSet
              title="Changes in saturation"
              colors={[-.5, -.4, -.3, -.2, -.1, 0, .1, .2, .3, .4, .5].map(perc => Color(colorAsRgba).saturate(perc)).map(col => toRgbaObject(col))}
              onChange={setColor}
            />
            <ColorSet
              title="Rotations"
              colors={Array.from({ length: 11 }, (v, k) => k * (360/11) ).map(perc => Color(colorAsRgba).rotate(perc)).map(col => toRgbaObject(col))}
              onChange={setColor}
            />
          </div>
        </div>
      </ToolContainer>
    </div>
  );
};
