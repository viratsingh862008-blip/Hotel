import * as Primitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';
export const Accordion = Primitive.Root;
export function AccordionItem({ className = '', ...props }: ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={'ui-accordion-item ' + className} {...props} />;
}
export function AccordionTrigger({ className = '', children, ...props }: ComponentProps<typeof Primitive.Trigger>) {
  return <Primitive.Header className="ui-accordion-header"><Primitive.Trigger className={'ui-accordion-trigger ' + className} {...props}>{children}<ChevronDown size={18} className="ui-accordion-chevron" aria-hidden="true" /></Primitive.Trigger></Primitive.Header>;
}
export function AccordionContent({ className = '', children, ...props }: ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Content className={'ui-accordion-content ' + className} {...props}><div className="ui-accordion-content-inner">{children}</div></Primitive.Content>;
}