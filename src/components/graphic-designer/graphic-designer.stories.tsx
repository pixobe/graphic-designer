import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeGraphicDesignerEelement } from './graphic-designer';
import { dataBasic, dataBird, defaultData } from './data.mock';


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


const meta = {
    title: 'The Designer',
    component: 'graphic-designer',
    parameters: {},
    argTypes: {},
    args: {},
    render: (props: any) => {
        const save = (e) => { console.log(e.detail) }
        return <graphic-designer {...props} onSave={save} />;
    }
} satisfies Meta<PixobeGraphicDesignerEelement>;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
    args: {
        showSaveButton: true,
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};

export const BasicWithData: Story = {
    args: {
        showSaveButton: true,
        data: dataBasic,
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};

export const Background: Story = {
    args: {
        src: "/assets/hello-kitty.jpg",
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};

/**
 * 
 */
export const PopulatedDataWithEmojis: Story = {
    args: {
        data: dataBird,
        src: "/assets/hello-kitty.jpg",
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};


export const BackgroundLandscape: Story = {
    args: {
        src: "/assets/landscape.jpg",
        showSaveButton: true,
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};

export const WithSave: Story = {
    args: {
        src: "/assets/hello-kitty.jpg",
        showSaveButton: true,
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        }
    },
};

export const Populated: Story = {
    args: {
        src: "/assets/hello-kitty.jpg",
        config: {
            gallery: [GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY, GALLERY]
        },
        data: defaultData
    },
};