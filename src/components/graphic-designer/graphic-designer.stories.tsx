import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeGraphicDesignerEelement } from './graphic-designer';

const meta = {
    title: 'The Designer',
    component: 'graphic-designer',
    parameters: {},
    argTypes: {},
    args: {},
} satisfies Meta<PixobeGraphicDesignerEelement>;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {
        src: "/assets/hello-kitty.jpg",
        config: {
            gallery: [
                {
                    name: "Media Gallery",
                    images: [
                        {
                            url: "/assets/gallery/cow-calf.png"
                        },
                        {
                            url: "/assets/gallery/mouse.png"
                        },
                        {
                            url: "/assets/gallery/lion.jpg"
                        },
                        {
                            url: "/assets/gallery/monster-car.jpg"
                        },
                    ]
                }
            ]
        }
    },
    render: (props: any) => {
        return <graphic-designer {...props} />;
    }
};
