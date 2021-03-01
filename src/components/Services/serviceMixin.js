/**
 * @module serviceMixin
 * @category Components
 * @subcategory Services
 * @description A mixin for services
 * @vue-prop {Object} service The service that the component is supposed to render
 */
export default {
    props: {
        service:{
            type: Object,
            required: true
        }
    }
}
