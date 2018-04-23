import marked from 'marked';
import highlight from 'highlight.js';
marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value;
    }
});

export default {
    name: 'md-editor',
    props: ['value'],
    data() {
        return {
            mdText: this.value,
            editorMode: 'liveMode'
        };
    },
    computed: {
        mdHtml() {
            return marked(this.mdText);
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.value) {
                this.mdText = this.value;
            }
        });
    },
    updated() {
        this.updateValue();
    },
    methods: {
        setEditorMode(mode) {
            this.editorMode = mode;
        },
        updateValue() {
            this.$emit('input', this.mdText);
        }
    },
    watch: {
        value(value) {
            this.mdText = value;
        }
    }
};
