import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { GraphicText } from './graphic-text';

const meta = {
    title: 'Text',
    component: 'graphic-text',
    parameters: {},
    argTypes: {},
    args: {},
    render: (props: any) => {
        return <graphic-text {...props} />;
    }
} satisfies Meta<GraphicText>;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {},
};
