import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { alpha, globals, px, useTheme } from './common';
import cxs from 'cxs';

export const TypedSortList: <T>() => React.FC<{
  entries: T[];
  canDelete: boolean;
  renderItem: (item: T) => {
    id: string,
    icon: IconProp,
    title: string,
    ctxTitle: string,
  },
  onDeleteItem: (item: T) => any;
  onReorder: (entries: T[]) => any;
}> = () => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  return (
    <DragDropContext onDragEnd={result => {
      if (!result.destination) return;
      const newList = Array.from(props.entries);
      const [removed] = newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, removed);
      props.onReorder(newList);
    }}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}
          >
            {
              props.entries.map((item, index) => {
                const { id, title, ctxTitle, icon } = props.renderItem(item);

                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={cxs({
                          padding: px(16, 32),
                          margin: px(0, 0, 8, 0),
                          backgroundColor: alpha(theme.color, .1),
                          borderRadius: globals.borderRadius,

                          '> div': {
                            opacity: 0,
                          },

                          ':hover': {
                            backgroundColor: alpha(theme.color, .15),
                            '> div': {
                              opacity: 1,
                            },
                          },

                          '> svg': {
                            marginRight: px(16)
                          }
                        })}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FontAwesomeIcon icon={icon} />
                        { title }
                        <div className={cxs({
                          float: 'right',
                          color: alpha('#fff', .6),
                          transition: '.2s all ease',
                          '> svg': {
                            marginLeft: px(16),
                            transition: '.2s all ease',
                            cursor: 'pointer',
                            ':hover': {
                              transform: 'translateY(-2px) scale(1.1)'
                            }
                          }
                        })}>
                          { ctxTitle }
                          { props.canDelete && (
                            <FontAwesomeIcon
                              icon={faTimes}
                              color="white"
                              onClick={() => props.onDeleteItem(item)}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
