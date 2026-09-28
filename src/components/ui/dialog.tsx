import * as Primitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
export const Dialog = Primitive.Root;
export const DialogClose = Primitive.Close;
export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export const DialogContent = (props: ComponentProps<typeof Primitive.Content>) => <Primitive.Portal><Primitive.Overlay className="ui-dialog-overlay" /><Primitive.Content className={'ui-dialog-content ' + (props.className ?? '')} {...props} /></Primitive.Portal>;