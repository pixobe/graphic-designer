import type { Meta, StoryObj } from '@storybook/html-vite';
import { GraphicDesigner } from './graphic-designer';


const meta: Meta<GraphicDesigner> = {
    title: "Graphic Designer/Designs",
    render: (_, { loaded: { } }) => {
        const el = document.createElement("graphic-designer");
        return el;
    }
};

export default meta;
type Story = StoryObj<GraphicDesigner>;

export const Design: Story = {
    args: {
    }
};
