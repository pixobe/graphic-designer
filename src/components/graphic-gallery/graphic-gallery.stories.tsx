import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { GraphicGallery } from './graphic-gallery';

const meta = {
    title: 'Media Gallery',
    component: 'graphic-gallery',
    parameters: {},
    argTypes: {},
    args: {},
    render: (props: any) => {
        return <graphic-gallery {...props} />;
    }
} satisfies Meta<GraphicGallery>;

export default meta;
type Story = StoryObj;


const GALLERY = {
    name: "Animals",
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

export const Basic: Story = {
    args: {
        mediaGallery: [
            GALLERY
        ]
    },
};

export const ManyGallery: Story = {
    args: {
        mediaGallery: [
            GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY
        ]
    },
};
