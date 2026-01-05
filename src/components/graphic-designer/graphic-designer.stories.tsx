import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeGraphicDesignerEelement } from './graphic-designer';
import { dataBasic } from './data.mock';


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

const data = {
    "version": "7.1.0",
    "objects": [
        {
            "fontSize": 40,
            "fontWeight": "normal",
            "fontFamily": "Times New Roman",
            "fontStyle": "normal",
            "lineHeight": 1.16,
            "text": "Hello Jitty",
            "charSpacing": 0,
            "textAlign": "left",
            "styles": [],
            "pathStartOffset": 0,
            "pathSide": "left",
            "pathAlign": "baseline",
            "underline": false,
            "overline": false,
            "linethrough": false,
            "textBackgroundColor": "",
            "direction": "ltr",
            "textDecorationThickness": 66.667,
            "type": "IText",
            "version": "7.1.0",
            "originX": "center",
            "originY": "center",
            "left": 269.5,
            "top": 345.5,
            "width": 167.7734,
            "height": 45.2,
            "fill": "#FF7799",
            "stroke": null,
            "strokeWidth": 1,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 1,
            "scaleY": 1,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0
        },
        {
            "cropX": 0,
            "cropY": 0,
            "type": "Image",
            "version": "7.1.0",
            "originX": "center",
            "originY": "center",
            "left": 316.5,
            "top": 513.5,
            "width": 432,
            "height": 512,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 0.3906,
            "scaleY": 0.3906,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "src": "http://localhost:6006/assets/gallery/lion.jpg",
            "crossOrigin": "anonymous",
            "filters": []
        },
        {
            "fontSize": 40,
            "fontWeight": "normal",
            "fontFamily": "Times New Roman",
            "fontStyle": "normal",
            "lineHeight": 1.16,
            "text": "🦃",
            "charSpacing": 0,
            "textAlign": "left",
            "styles": [],
            "pathStartOffset": 0,
            "pathSide": "left",
            "pathAlign": "baseline",
            "underline": false,
            "overline": false,
            "linethrough": false,
            "textBackgroundColor": "",
            "direction": "ltr",
            "textDecorationThickness": 66.667,
            "type": "IText",
            "version": "7.1.0",
            "originX": "center",
            "originY": "center",
            "left": 255.6832,
            "top": 250.8918,
            "width": 40,
            "height": 45.2,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 1,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 2.6187,
            "scaleY": 2.6187,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0
        }
    ],
    "background": "#ff00ff",
    "backgroundImage": {
        "cropX": 0,
        "cropY": 0,
        "type": "Image",
        "version": "7.1.0",
        "originX": "center",
        "originY": "center",
        "left": 269.5,
        "top": 345.5,
        "width": 400,
        "height": 512,
        "fill": "rgb(0,0,0)",
        "stroke": null,
        "strokeWidth": 0,
        "strokeDashArray": null,
        "strokeLineCap": "butt",
        "strokeDashOffset": 0,
        "strokeLineJoin": "miter",
        "strokeUniform": false,
        "strokeMiterLimit": 4,
        "scaleX": 1.3496,
        "scaleY": 1.3496,
        "angle": 0,
        "flipX": false,
        "flipY": false,
        "opacity": 1,
        "shadow": null,
        "visible": true,
        "backgroundColor": "",
        "fillRule": "nonzero",
        "paintFirst": "fill",
        "globalCompositeOperation": "source-over",
        "skewX": 0,
        "skewY": 0,
        "src": "http://localhost:6006/assets/hello-kitty.jpg",
        "crossOrigin": "anonymous",
        "filters": []
    }
};

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
        data
    },
};