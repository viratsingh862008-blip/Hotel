import * as Primitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';
export const Accordion = Primitive.Root;
export const AccordionItem = (props: ComponentProps<typeof Primitive.Item>) => <Primitive.Item className={'ui-accordion-item ' + (props.className ?? '')} {...props} />;
export const AccordionTrigger = (props: ComponentProps<typeof Primitive.Trigger>) => <Primitive.Header className="ui-accordion-header"><Primitive.Trigger className={'ui-accordion-trigger ' + (props.className ?? '')} {...props}>{props.children}<ChevronDown size={18} className="ui-accordion-chevron" aria-hidden="true" /></Primitive.Trigger></Primitive.Header>;
export const AccordionContent = (props: ComponentProps<typeof Primitive.Content>) => <Primitive.Content className={'ui-accordion-content ' + (props.className ?? '')} {...props}><div className="ui-accordion-content-inner">{props.children}</div></Primitive.Content>;