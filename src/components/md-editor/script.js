import marked from 'marked';
import highlight from 'highlight.js';
marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value;
    }
});

export default {
    name: 'md-editor',
    data() {
        return {
            mdText: '',
            editorMode: 'liveMode'
        };
    },
    computed: {
        mdHtml() {
            return marked(this.mdText);
        }
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
    }
};
