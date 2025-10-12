import type { Meta, StoryObj } from '@storybook/html-vite';
import { GraphicText } from './graphic-text';


const meta: Meta<GraphicText> = {
    title: "Graphic Designer/Text",
    render: (_, { loaded: { } }) => {
        const el = document.createElement("graphic-text");
        return el;
    }
};

export default meta;
type Story = StoryObj<GraphicText>;

export const Design: Story = {
    args: {
    }
};
