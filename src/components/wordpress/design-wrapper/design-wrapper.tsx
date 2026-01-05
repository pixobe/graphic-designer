import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'p-wpdesign-wrapper',
  styleUrl: 'design-wrapper.scss',
  shadow: true,
})
export class DesignWrapper {

  @Prop({ reflect: true })
  postId: number;

  @Prop({ reflect: true })
  wpnonce: string;

  @Prop()
  saveButton?: boolean;


  @State()
  response: { config: any, backgroundUrl: string, data?: any };

  @State()
  isLoading: boolean = false;

  @State()
  message: string = '';

  async componentWillLoad() {
    this.fetchDesign();
  }

  @Watch('postId')
  async handlePostIdChange(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      await this.fetchDesign();
    }
  }

  private async fetchDesign() {
    if (this.postId == null) {
      return;
    }
    this.isLoading = true;
    const url = `/wp-json/pixobe-designer/v1/design/${encodeURIComponent(String(this.postId))}`;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (this.wpnonce) {
      headers['X-WP-Nonce'] = this.wpnonce;
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'same-origin',
      });

      if (!response.ok) {
        console.warn(`Failed to load design ${this.postId}: ${response.status} ${response.statusText}`);
        return;
      }

      const payload = await response.json();
      this.response = payload;
    } catch (error: any) {
      console.warn(`Failed to load design ${this.postId}`, error);
      this.message = error.message || "Failed to render design";
    } finally {
      this.isLoading = false;
    }
  }

  onSave = (e: any) => {
    this.isLoading = true;
    this.message = '';
    const payload = e.detail;
    const url = `/wp-json/pixobe-designer/v1/posts/${encodeURIComponent(String(this.postId))}/design-data`;
    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.wpnonce
      },
      body: JSON.stringify(payload)
    }).then(async (response) => {
      if (!response.ok) {
        return response.json().then(function (data) {
          throw data;
        });
      }
      console.log("Data is", await response.json())
      this.message = "Design saved."
    }).catch((error) => {
      console.error("Error::", error);
      this.message = error.message || "Failed to save the design";
    }).finally(() => {
      this.isLoading = false;
    });
  }

  render() {
    return (
      <Host>
        {this.isLoading && <div class="spinner-wrapper"><p-spinner></p-spinner></div>}
        {this.response && (
          <graphic-designer
            data={this.response.data}
            config={this.response.config}
            src={this.response.backgroundUrl}
            showSaveButton={this.saveButton}
            onSave={this.onSave}
          ></graphic-designer>
        )}
        {this.message && <p-toast message={this.message}></p-toast>}
      </Host>
    );
  }
}
