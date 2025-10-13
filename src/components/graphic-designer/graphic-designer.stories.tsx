import type { Meta, StoryObj } from '@storybook/html-vite';
import { GraphicDesigner } from './graphic-designer';


const meta: Meta<GraphicDesigner> = {
    title: "Graphic Designer/Designs",
    render: (args, { loaded: { } }) => {
        const el = document.createElement("graphic-designer");
        //
        el.src = args.src;
        return el;
    }
};

export default meta;
type Story = StoryObj<GraphicDesigner>;

export const Design: Story = {
    args: {
        src: "/assets/hello-kitty.jpg"
    }
};
