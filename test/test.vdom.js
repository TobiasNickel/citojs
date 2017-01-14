/*
 * Copyright (c) 2015, Joel Richard
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

describe('cito.vdom', function () {

    // TODO separate data from code
    // TODO generate extensive test data automatically

    var domDefs = {
        'attrs div': [
            {
                name: 'none',
                node: {t: 'div'},
                html: '<div></div>'
            },
            {
                name: 'null',
                node: {t: 'div', a: null},
                html: '<div></div>'
            },
            {
                name: 'empty',
                node: {t: 'div', a: {}},
                html: '<div></div>'
            },
            {
                name: 'id 1',
                node: {t: 'div', a: {id: 'id1'}},
                html: '<div id="id1"></div>'
            },
            {
                name: 'id 2',
                node: {t: 'div', a: {id: 'id2'}},
                html: '<div id="id2"></div>'
            },
            {
                name: 'id and class',
                node: {t: 'div', a: {id: 'id1', 'class': 'class1'}},
                html: '<div id="id1" class="class1"></div>'
            },
            {
                name: 'id and class',
                node: {t: 'div', a: {id: 'id1', 'class': 'class1'}},
                html: '<div id="id1" class="class1"></div>'
            },
            {
                name: 'title',
                node: {t: 'div', a: {title: 'title1'}},
                html: '<div title="title1"></div>'
            },
            {
                name: 'data-attr',
                node: {t: 'div', a: {'data-attr': 'attr1'}},
                html: '<div data-attr="attr1"></div>'
            }
        ],
        'attrs input': [
            {
                name: 'empty',
                node: {t: 'input'},
                html: '<input>'
            },
            {
                name: 'required false',
                node: {t: 'input', a: {required: false}},
                html: '<input>'
            },
            {
                name: 'required false',
                node: {t: 'input', a: {required: true}},
                html: '<input required>'
            }
        ],
        'general': [
            {
                name: 'children none',
                node: {t: 'div'},
                html: '<div></div>'
            },
            {
                name: 'children empty',
                node: {t: 'div', c: []},
                html: '<div></div>'
            },
            {
                name: 'text',
                node: {t: 'div', c: 'text'},
                html: '<div>text</div>'
            },
            {
                name: 'text array',
                node: {t: 'div', c: ['text']},
                html: '<div>text</div>'
            },
            {
                name: 'two ul',
                node: {
                    t: 'div', c: [
                        {t: 'ul', c: [{t: 'li', c: ['t0']}]},
                        {t: 'ul', c: [{t: 'li', c: ['t1']}, {t: 'li', c: ['t2']}]}
                    ]
                },
                html: '<div><ul><li>t0</li></ul><ul><li>t1</li><li>t2</li></ul></div>'
            },
            {
                name: 'two ul reversed',
                node: {
                    t: 'div', c: [
                        {t: 'ul', c: [{t: 'li', c: ['t1']}, {t: 'li', c: ['t2']}]},
                        {t: 'ul', c: [{t: 'li', c: ['t0']}]}
                    ]
                },
                html: '<div><ul><li>t1</li><li>t2</li></ul><ul><li>t0</li></ul></div>'
            }
        ],
        'text': [
            {
                name: 'text empty',
                node: {
                    t: 'div', c: ''
                },
                html: '<div></div>'
            },
            {
                name: 'text empty array',
                node: {
                    t: 'div', c: ['']
                },
                html: '<div></div>'
            },
            {
                name: 'two texts empty',
                node: {
                    t: 'div', c: ['', '']
                },
                html: '<div></div>'
            },
            {
                name: 'text object empty',
                node: {
                    t: 'div', c: {t: '#', c: ''}
                },
                html: '<div></div>'
            },
            {
                name: 'text object empty array',
                node: {
                    t: 'div', c: [{t: '#', c: ''}]
                },
                html: '<div></div>'
            },
            {
                name: 'text',
                node: {
                    t: 'div', c: 'text'
                },
                html: '<div>text</div>'
            },
            {
                name: 'text object',
                node: {
                    t: 'div', c: {t: '#', c: 'text'}
                },
                html: '<div>text</div>'
            },
            {
                name: 'element b + text empty',
                node: {
                    t: 'div', c: [
                        {t: 'b', c: 't0'},
                        ''
                    ]
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'element b + text',
                node: {
                    t: 'div', c: [
                        {t: 'b', c: 't0'},
                        't1'
                    ]
                },
                html: '<div><b>t0</b>t1</div>'
            },
            {
                name: 'text empty + element b',
                node: {
                    t: 'div', c: [
                        '',
                        {t: 'b', c: 't1'}
                    ]
                },
                html: '<div><b>t1</b></div>'
            },
            {
                name: 'text + element b',
                node: {
                    t: 'div', c: [
                        't0',
                        {t: 'b', c: 't1'}
                    ]
                },
                html: '<div>t0<b>t1</b></div>'
            },
            {
                name: 'text 0 + text 1',
                node: {
                    t: 'div', c: ['t0', 't1']
                },
                html: '<div>t0t1</div>'
            },
            {
                name: 'text 1 + text 0',
                node: {
                    t: 'div', c: ['t1', 't0']
                },
                html: '<div>t1t0</div>'
            }
        ],
        'escaping': [
            {
                name: 'attr',
                node: {t: 'div', a: {title: '\"&'}},
                html: '<div title="&quot;&amp;"></div>'
            },
            {
                name: 'content',
                node: {t: 'div', c: '<&>'},
                html: '<div>&lt;&amp;&gt;</div>'
            }
        ],
        'comments': [
            {
                name: 'comment 1',
                node: {t: 'div', c: {t: '!', c: 'comment 1'}},
                html: '<div><!--comment 1--></div>'
            },
            {
                name: 'comment 2',
                node: {t: 'div', c: {t: '!', c: 'comment 2'}},
                html: '<div><!--comment 2--></div>'
            }
        ],
        'html': [
            {
                name: 'html empty',
                node: {
                    t: 'div', c: {t: '<', c: ''}
                },
                html: '<div></div>'
            },
            {
                name: 'html empty array',
                node: {
                    t: 'div', c: [{t: '<', c: ''}]
                },
                html: '<div></div>'
            },
            {
                name: 'two html empty',
                node: {
                    t: 'div', c: [
                        {t: '<', c: ''},
                        {t: '<', c: ''}
                    ]
                },
                html: '<div></div>'
            },
            {
                name: 'html b',
                node: {
                    t: 'div', c: {t: '<', c: '<b>t0</b>'}
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'two html b',
                node: {
                    t: 'div', c: {t: '<', c: '<b>t0</b><b>t1</b>'}
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'element b + html empty',
                node: {
                    t: 'div', c: [
                        {t: 'b', c: 't0'},
                        {t: '<', c: ''}
                    ]
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'element b + html b',
                node: {
                    t: 'div', c: [
                        {t: 'b', c: 't0'},
                        {t: '<', c: '<b>t1</b>'}
                    ]
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'html empty + element b',
                node: {
                    t: 'div', c: [
                        {t: '<', c: ''},
                        {t: 'b', c: 't1'}
                    ]
                },
                html: '<div><b>t1</b></div>'
            },
            {
                name: 'html b + element b',
                node: {
                    t: 'div', c: [
                        {t: '<', c: '<b>t0</b>'},
                        {t: 'b', c: 't1'}
                    ]
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'text + html text',
                node: {
                    t: 'div', c: [
                        't0',
                        {t: '<', c: 'ht1'}
                    ]
                },
                html: '<div>t0ht1</div>'
            },
            {
                name: 'text + b',
                node: {
                    t: 'div', c: [
                        't0',
                        {t: '<', c: '<b>t1</b>'}
                    ]
                },
                html: '<div>t0<b>t1</b></div>'
            },
            {
                name: 'text + (html text + b)',
                node: {
                    t: 'div', c: [
                        't0',
                        {t: '<', c: 'ht1<b>t2</b>'}
                    ]
                },
                html: '<div>t0ht1<b>t2</b></div>'
            },
            {
                name: 'html + (html b + text)',
                node: {
                    t: 'div', c: [
                        't0',
                        {t: '<', c: '<b>t1</b>ht2'}
                    ]
                },
                html: '<div>t0<b>t1</b>ht2</div>'
            }
        ],
        'lists': [
            {
                name: 'empty',
                node: {
                    t: 'ul',
                    c: []
                },
                html: '<ul></ul>'
            },
            {
                name: '2 li',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', c: ['t0']},
                        {t: 'li', c: ['t', '1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li></ul>'
            },
            {
                name: '3 li',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', c: ['t', '0']},
                        {t: 'li', c: ['t1']},
                        {t: 'li', c: ['t2']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '5 li',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', c: ['t0']},
                        {t: 'li', c: ['t1']},
                        {t: 'li', c: ['t2']},
                        {t: 'li', c: ['t', '3']},
                        {t: 'li', c: ['t', '4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li><li>t3</li><li>t4</li></ul>'
            }
        ],
        'keyed lists': [
            {
                name: '0',
                node: {
                    t: 'ul',
                    c: [{t: 'li', key: 0, c: ['t0']}]
                },
                html: '<ul><li>t0</li></ul>'
            },
            {
                name: '1',
                node: {
                    t: 'ul',
                    c: [{t: 'li', key: 1, c: ['t1']}]
                },
                html: '<ul><li>t1</li></ul>'
            },
            {
                name: '2',
                node: {
                    t: 'ul',
                    c: [{t: 'li', key: 2, c: ['t2']}]
                },
                html: '<ul><li>t2</li></ul>'
            },
            {
                name: '9',
                node: {
                    t: 'ul',
                    c: [{t: 'li', key: 9, c: ['t9']}]
                },
                html: '<ul><li>t9</li></ul>'
            },
            {
                name: '0-1-2',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 2, c: ['t2']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '1-0-2',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 2, c: ['t2']}
                    ]
                },
                html: '<ul><li>t1</li><li>t0</li><li>t2</li></ul>'
            },
            {
                name: '0-2-1',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 2, c: ['t2']},
                        {t: 'li', key: 1, c: ['t1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t2</li><li>t1</li></ul>'
            },
            {
                name: '1-2',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 2, c: ['t2']}
                    ]
                },
                html: '<ul><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '0-1',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 1, c: ['t1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li></ul>'
            },
            {
                name: '0-1-2-3-4',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 2, c: ['t2']},
                        {t: 'li', key: 3, c: ['t3']},
                        {t: 'li', key: 4, c: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li><li>t3</li><li>t4</li></ul>'
            },
            {
                name: '4-3-2-1-0',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 4, c: ['t4']},
                        {t: 'li', key: 3, c: ['t3']},
                        {t: 'li', key: 2, c: ['t2']},
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 0, c: ['t0']}
                    ]
                },
                html: '<ul><li>t4</li><li>t3</li><li>t2</li><li>t1</li><li>t0</li></ul>'
            },
            {
                name: '2-1-4-0-3',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 2, c: ['t2']},
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 4, c: ['t4']},
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 3, c: ['t3']}
                    ]
                },
                html: '<ul><li>t2</li><li>t1</li><li>t4</li><li>t0</li><li>t3</li></ul>'
            },
            {
                name: '4-1-2',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 4, c: ['t4']},
                        {t: 'li', key: 1, c: ['t1']},
                        {t: 'li', key: 2, c: ['t2']}
                    ]
                },
                html: '<ul><li>t4</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '0-4',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 4, c: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t4</li></ul>'
            },
            {
                name: '0-5-4',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 5, c: ['t5']},
                        {t: 'li', key: 4, c: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t5</li><li>t4</li></ul>'
            },
            {
                name: '0-5-6-4',
                node: {
                    t: 'ul',
                    c: [
                        {t: 'li', key: 0, c: ['t0']},
                        {t: 'li', key: 6, c: ['t6']},
                        {t: 'li', key: 5, c: ['t5']},
                        {t: 'li', key: 4, c: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t6</li><li>t5</li><li>t4</li></ul>'
            }
        ],
        'keyed html': [
            {
                name: '0',
                node: {
                    t: 'div',
                    c: [
                        {t: '<', key: 0, c: '<b>t0.0</b><b>t0.1</b>'}
                    ]
                },
                html: '<div><b>t0.0</b><b>t0.1</b></div>'
            },
            {
                name: '1',
                node: {
                    t: 'div',
                    c: [
                        {t: '<', key: 1, c: '<b>t1.0</b><b>t1.1</b>'}
                    ]
                },
                html: '<div><b>t1.0</b><b>t1.1</b></div>'
            },
            {
                name: '0-1',
                node: {
                    t: 'div',
                    c: [
                        {t: '<', key: 0, c: '<b>t0.0</b><b>t0.1</b>'},
                        {t: '<', key: 1, c: '<b>t1.0</b><b>t1.1</b>'}
                    ]
                },
                html: '<div><b>t0.0</b><b>t0.1</b><b>t1.0</b><b>t1.1</b></div>'
            },
            {
                name: '1-0',
                node: {
                    t: 'div',
                    c: [
                        {t: '<', key: 1, c: '<b>t1.0</b><b>t1.1</b>'},
                        {t: '<', key: 0, c: '<b>t0.0</b><b>t0.1</b>'}
                    ]
                },
                html: '<div><b>t1.0</b><b>t1.1</b><b>t0.0</b><b>t0.1</b></div>'
            }
        ],
        'style': [
            {
                name: 'none',
                node: {t: 'div'},
                html: '<div></div>'
            },
            {
                name: 'null',
                node: {t: 'div', a: {style: null}},
                html: '<div></div>'
            },
            {
                name: 'string empty',
                node: {t: 'div', a: {style: ''}},
                html: '<div></div>'
            },
            {
                name: 'string color',
                node: {t: 'div', a: {style: 'color: red;'}},
                html: '<div style="color: red;"></div>'
            },
            {
                name: 'string color and display',
                node: {t: 'div', a: {style: 'color: red; display: inline;'}},
                html: '<div style="color: red; display: inline;"></div>'
            },
            {
                name: 'object empty',
                node: {t: 'div', a: {style: {}}},
                html: '<div></div>'
            },
            {
                name: 'object color',
                node: {t: 'div', a: {style: {color: 'red'}}},
                html: '<div style="color: red;"></div>'
            },
            {
                name: 'object color and display',
                node: {t: 'div', a: {style: {color: 'red', display: 'inline'}}},
                html: '<div style="color: red; display: inline;"></div>'
            },
            {
                name: 'object color !important',
                node: {t: 'div', a: {style: {color: 'red !important'}}},
                html: '<div style="color: red !important;"></div>'
            }
        ],
        'simple fragments': [
            {
                name: 'fragment without children',
                node: {t: 'div', c: {}},
                html: '<div></div>'
            },
            {
                name: 'two fragments without children',
                node: {t: 'div', c: [{}, {}]},
                html: '<div></div>'
            },
            {
                name: 'fragment with empty children array',
                node: {t: 'div', c: {c: []}},
                html: '<div></div>'
            },
            {
                name: 'fragment with null children',
                node: {t: 'div', c: {c: null}},
                html: '<div></div>'
            },
            {
                name: 'fragment with text children array',
                node: {t: 'div', c: {c: ['text']}},
                html: '<div>text</div>'
            },
            {
                name: 'fragment with text child',
                node: {t: 'div', c: {c: 'text'}},
                html: '<div>text</div>'
            }
        ],
        'surrounded fragments': [
            {
                name: 'div + empty fragment',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: []
                        }
                    ]
                },
                html: '<div><div>t0</div></div>'
            },
            {
                name: 'div + fragment with 2 div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: [
                                {t: 'div', c: 't1'},
                                {t: 'div', c: 't2'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div></div>'
            },
            {
                name: 'fragment with 2 div + div',
                node: {
                    t: 'div',
                    c: [
                        {
                            c: [
                                {t: 'div', c: 't1'},
                                {t: 'div', c: 't2'}
                            ]
                        },
                        {t: 'div', c: 't3'}
                    ]
                },
                html: '<div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'fragment with 2 div',
                node: {
                    t: 'div',
                    c: [
                        {
                            c: [
                                {t: 'div', c: 't1'},
                                {t: 'div', c: 't2'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t1</div><div>t2</div></div>'
            },
            {
                name: 'div + fragment with 3 div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: [
                                {t: 'div', c: 't1'},
                                {t: 'div', c: 't2'},
                                {t: 'div', c: 't3'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'div + fragment with 2 div + div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: [
                                {t: 'div', c: 't1'},
                                {t: 'div', c: 't2'}
                            ]
                        },
                        {t: 'div', c: 't3'}
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'div + empty fragment + div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: []
                        },
                        {t: 'div', c: 't3'}
                    ]
                },
                html: '<div><div>t0</div><div>t3</div></div>'
            },
            {
                name: 'div + fragment with text + div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: 't1'
                        },
                        {t: 'div', c: 't3'}
                    ]
                },
                html: '<div><div>t0</div>t1<div>t3</div></div>'
            },
            {
                name: 'div + fragment with html + div',
                node: {
                    t: 'div',
                    c: [
                        {t: 'div', c: 't0'},
                        {
                            c: {t: '<', c: '<b>t1</b>'}
                        },
                        {t: 'div', c: 't3'}
                    ]
                },
                html: '<div><div>t0</div><b>t1</b><div>t3</div></div>'
            }
        ],
        'keyed fragments': [
            {
                name: '0',
                node: {
                    t: 'ul',
                    c: [
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '0-1',
                node: {
                    t: 'ul',
                    c: [
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]},
                        {key: 1, c: [{t: 'li', c: 't1.0'},{t: 'li', c: 't1.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t1.0</li><li>t1.1</li></ul>'
            },
            {
                name: '1-0',
                node: {
                    t: 'ul',
                    c: [
                        {key: 1, c: [{t: 'li', c: 't1.0'},{t: 'li', c: 't1.1'}]},
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t1.0</li><li>t1.1</li><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '1',
                node: {
                    t: 'ul',
                    c: [
                        {key: 1, c: [{t: 'li', c: 't1.0'},{t: 'li', c: 't1.1'}]}
                    ]
                },
                html: '<ul><li>t1.0</li><li>t1.1</li></ul>'
            },
            {
                name: '0-1-2',
                node: {
                    t: 'ul',
                    c: [
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]},
                        {key: 1, c: [{t: 'li', c: 't1.0'},{t: 'li', c: 't1.1'}]},
                        {key: 2, c: [{t: 'li', c: 't2.0'},{t: 'li', c: 't2.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t1.0</li><li>t1.1</li><li>t2.0</li><li>t2.1</li></ul>'
            },
            {
                name: '2-1-0',
                node: {
                    t: 'ul',
                    c: [
                        {key: 2, c: [{t: 'li', c: 't2.0'},{t: 'li', c: 't2.1'}]},
                        {key: 1, c: [{t: 'li', c: 't1.0'},{t: 'li', c: 't1.1'}]},
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t2.0</li><li>t2.1</li><li>t1.0</li><li>t1.1</li><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '0-2',
                node: {
                    t: 'ul',
                    c: [
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]},
                        {key: 2, c: [{t: 'li', c: 't2.0'},{t: 'li', c: 't2.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t2.0</li><li>t2.1</li></ul>'
            },
            {
                name: '2-0',
                node: {
                    t: 'ul',
                    c: [
                        {key: 2, c: [{t: 'li', c: 't2.0'},{t: 'li', c: 't2.1'}]},
                        {key: 0, c: [{t: 'li', c: 't0.0'},{t: 'li', c: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t2.0</li><li>t2.1</li><li>t0.0</li><li>t0.1</li></ul>'
            }
        ],
        'nested fragments': [
            {
                name: 'fragment > text',
                node: {
                    t: 'div',
                    c: {c: {c: 't0'}}
                },
                html: '<div>t0</div>'
            },
            {
                name: 'fragment > div',
                node: {
                    t: 'div',
                    c: {c: {t: 'div', c: 't0'}}
                },
                html: '<div><div>t0</div></div>'
            },
            {
                name: 'fragment > fragment > text',
                node: {
                    t: 'div',
                    c: {c: {c: 't00'}}
                },
                html: '<div>t00</div>'
            },
            {
                name: 'fragment > fragment > text + text',
                node: {
                    t: 'div',
                    c: {c: {c: ['t00', 't01']}}
                },
                html: '<div>t00t01</div>'
            },
            {
                name: 'fragment > fragment > html',
                node: {
                    t: 'div',
                    c: {c: {c: {t: '<', c: '<b>t00</b>'}}}

                },
                html: '<div><b>t00</b></div>'
            },
            {
                name: 'fragment > fragment > div',
                node: {
                    t: 'div',
                    c: {c: {c: {t: 'div', c: 't00'}}}
                },
                html: '<div><div>t00</div></div>'
            },
            {
                name: 'fragment > fragment > div + div',
                node: {
                    t: 'div',
                    c: {c: {c: [{t: 'div', c: 't00'}, {t: 'div', c: 't01'}]}}
                },
                html: '<div><div>t00</div><div>t01</div></div>'
            }
        ]
    };

    /*
    function immediatePromise(valueCallback) {
        return {then: function (thenCallback) {
            thenCallback(valueCallback());
        }};
    }

    function timeoutPromise(valueCallback) {
        return {then: function (thenCallback) {
            window.setTimeout(function () {
                thenCallback(valueCallback());
            }, 0);
        }};
    }

    domDefs['promise'] = [
        {
            name: 'children immediate',
            node: {
                t: 'ul', c: immediatePromise(function () {
                    return [
                        {t: 'li', c: 't0'}
                    ]
                })
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'children timeout',
            node: {
                t: 'ul', c: timeoutPromise(function () {
                    return [
                        {t: 'li', c: 't0'}
                    ]
                })
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child immediate',
            node: {
                t: 'ul', c: [
                    immediatePromise(function () {
                        return {t: 'li', c: 't0'};
                    })
                ]
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child timeout',
            node: {
                t: 'ul', c: [
                    timeoutPromise(function () {
                        return {t: 'li', c: 't0'};
                    })
                ]
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child immediate before',
            node: {
                t: 'ul', c: [
                    immediatePromise(function () {
                        return {t: 'li', c: 't0'}
                    }),
                    {t: 'li', c: 't1'}
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child timeout before',
            node: {
                t: 'ul', c: [
                    timeoutPromise(function () {
                        return {t: 'li', c: 't0'}
                    }),
                    {t: 'li', c: 't1'}
                ]
            },
            html: '<ul><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child immediate after',
            node: {
                t: 'ul', c: [
                    {t: 'li', c: 't0'},
                    immediatePromise(function () {
                        return {t: 'li', c: 't1'}
                    })
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child timeout after',
            node: {
                t: 'ul', c: [
                    {t: 'li', c: 't0'},
                    timeoutPromise(function () {
                        return {t: 'li', c: 't1'}
                    })
                ]
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'two children timeout',
            node: {
                t: 'ul', c: [
                    timeoutPromise(function () {
                        return {t: 'li', c: 't0'}
                    }),
                    timeoutPromise(function () {
                        return {t: 'li', c: 't1'}
                    })
                ]
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'wrapped child timeout',
            node: {
                t: 'div',
                c: [
                    {
                        t: 'ul', c: [
                        timeoutPromise(function () {
                            return {t: 'li', c: 't0'}
                        })
                    ]
                    }
                ]
            },
            html: '<div><ul></ul></div>',
            htmlDelayed: '<div><ul><li>t0</li></ul></div>'
        }
    ];
    */

    var ulTwoLi = {
        t: 'ul',
        c: [
            {t: 'li', c: 't0'},
            {t: 'li', c: 't1'}
        ]
    };
    var twoLi = [
        {t: 'li', c: 't0'},
        {t: 'li', c: 't1'}
    ];
    var callbackOldNodes;
    var liFunc = function (oldNode) {
        callbackOldNodes && callbackOldNodes.push(oldNode);
        return {t: 'li', c: 't'};
    };
    domDefs['callback'] = [
        {
            name: 'ul',
            node: function (oldNode) {
                callbackOldNodes && callbackOldNodes.push(oldNode);
                return _.cloneDeep(ulTwoLi);
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            oldNodes: [ulTwoLi]
        },
        {
            name: 'ul children',
            node: {
                t: 'ul',
                c: function (oldChildren) {
                    callbackOldNodes && callbackOldNodes.push(oldChildren);
                    return _.cloneDeep(twoLi);
                }
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            oldNodes: [twoLi]
        },
        {
            name: 'ul li',
            node: {
                t: 'ul',
                c: [liFunc, liFunc]
            },
            html: '<ul><li>t</li><li>t</li></ul>',
            oldNodes: [liFunc(), liFunc()]
        }
    ];

    domDefs['callback retain'] = [
        {
            name: 'children',
            node: {
                t: 'ul',
                c: function (oldChildren) {
                    if (!oldChildren) {
                        return [
                            {t: 'li', c: 't0'},
                            {t: 'li', c: 't1'}
                        ];
                    }
                }
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            updateOnlySelf: true
        },
        {
            name: 'child',
            node: {
                t: 'ul',
                c: [
                    function (oldChild) { if (!oldChild) return {t: 'li', c: 't0'}}
                ]
            },
            html: '<ul><li>t0</li></ul>',
            updateOnlySelf: true
        },
        {
            name: 'two children',
            node: {
                t: 'ul',
                c: [
                    function (oldChild) { if (!oldChild) return {t: 'li', c: 't0'}},
                    function (oldChild) { if (!oldChild) return {t: 'li', c: 't1'}}
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            updateOnlySelf: true
        }
    ];

    var helperDiv = document.createElement('div');
    function supportsNamespace(tag) {
        helperDiv.innerHTML = '<' + tag + '>';
        var firstChild = helperDiv.firstChild;
        return firstChild ? firstChild.namespaceURI !== helperDiv.namespaceURI : false;
    }

    if (supportsNamespace('svg')) {
        var svgNamespaces = {
            'http://www.w3.org/2000/svg': ['svg', 'a', 'circle'],
            'http://www.w3.org/1999/xlink': ['xlink:href']
        };
        domDefs['svg'] = [
            {
                name: 'link',
                node: {
                    t: 'svg',
                    a: {height: 20, width: 40},
                    c: {
                        t: 'a',
                        a: {'xlink:href': 'http://link'},
                        c: {t: 'text', a: {x: 0, y: 0}, c: 'link'}
                    }
                },
                html: '<svg height="20" width="40"><a xlink:href="http://link"><text x="0" y="0">link</text></a></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'two links',
                node: {
                    t: 'svg',
                    a: {height: 20, width: 40},
                    c: [
                        {
                            t: 'a',
                            a: {'xlink:href': 'http://link1'},
                            c: {t: 'text', a: {x: 0, y: 0}, c: 'link1'}
                        },
                        {
                            t: 'a',
                            a: {'xlink:href': 'http://link2'},
                            c: {t: 'text', a: {x: 0, y: 0}, c: 'link2'}
                        }
                    ]
                },
                html: '<svg height="20" width="40"><a xlink:href="http://link1"><text x="0" y="0">link1</text></a><a xlink:href="http://link2"><text x="0" y="0">link2</text></a></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'circle',
                node: {
                    t: 'svg',
                    a: {height: 40, width: 40},
                    c: {
                        t: 'circle',
                        a: {cx: 20, cy: 20, r: 10, stroke: 'black', 'stroke-width': 1, fill: 'red'}
                    }
                },
                html: '<svg height="40" width="40"><circle cx="20" cy="20" r="10" stroke="black" stroke-width="1" fill="red"></circle></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'wrapped circle',
                node: {
                    t: 'div',
                    c: {
                        t: 'svg',
                        a: {height: 40, width: 40},
                        c: {
                            t: 'circle',
                            a: {cx: 20, cy: 20, r: 10, stroke: 'black', 'stroke-width': 1, fill: 'red'}
                        }
                    }
                },
                html: '<div><svg height="40" width="40"><circle cx="20" cy="20" r="10" stroke="black" stroke-width="1" fill="red"></circle></svg></div>',
                namespaces: svgNamespaces
            },
            {
                name: 'circle fragment',
                node: {
                    t: 'svg',
                    c: {c: [{t: 'circle'}]}
                },
                html: '<svg><circle></circle></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'two circles fragment',
                node: {
                    t: 'svg',
                    c: {c: [{t: 'circle'}, {t: 'circle'}]}
                },
                html: '<svg><circle></circle><circle></circle></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'class',
                node: {
                    t: 'svg',
                    a: {'class': 'class1'},
                    c: {t: 'circle', a: {'class': 'class2'}}
                },
                html: '<svg class="class1"><circle class="class2"></circle></svg>',
                namespaces: svgNamespaces
            },

        ];
    }
    if (supportsNamespace('math')) {
        var mathmlNamespaces = {
            'http://www.w3.org/1998/Math/MathML': ['math', 'mi', 'mo']
        };
        domDefs['mathml'] = [
            {
                name: 'a',
                node: {
                    t: 'math',
                    c: {t: 'mi', c: 'a'}
                },
                html: '<math><mi>a</mi></math>',
                namespaces: mathmlNamespaces
            },
            {
                name: 'a + b',
                node: {
                    t: 'math',
                    c: [
                        {t: 'mi', c: 'a'},
                        {t: 'mo', c: '+'},
                        {t: 'mi', c: 'b'}
                    ]
                },
                html: '<math><mi>a</mi><mo>+</mo><mi>b</mi></math>',
                namespaces: mathmlNamespaces
            },
            {
                name: 'a + c',
                node: {
                    t: 'math',
                    c: [
                        {t: 'mi', c: 'a'},
                        {t: 'mo', c: '+'},
                        {t: 'mi', c: 'c'}
                    ]
                },
                html: '<math><mi>a</mi><mo>+</mo><mi>c</mi></math>',
                namespaces: mathmlNamespaces
            }
        ];
    }

    describe('#create()', function () {
        describe('DOM', function () {
            _.forEach(domDefs, function (defs, groupName) {
                describe(groupName, function () {
                    _.forEach(defs, function (def) {
                        it(def.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def.node));
                            expect(node.dom).to.eqlDom(def.html);
                            verifyNamespaces(node.dom, def.namespaces);
                        });
                    });
                });
                describe(groupName + ' after delay', function () {
                    _.forEach(defs, function (def) {
                        if (def.htmlDelayed) {
                            it(def.name, function (done) {
                                var node = cito.vdom.create(_.cloneDeep(def.node));
                                window.setTimeout(function () {
                                    expect(node.dom).to.eqlDom(def.htmlDelayed);
                                    done();
                                }, 1);
                            });
                        }
                    });
                });
            });
        });
    });

    var inputPropDefs = [
        {
            name: 'input text',
            node1: {t: 'input', a: {value: 'val1'}},
            node2: {t: 'input', a: {value: 'val1'}},
            prop: 'value',
            value1: 'val1', value2: 'val1'
        },
        {
            name: 'input text change',
            node1: {t: 'input', a: {value: 'val1'}},
            node2: {t: 'input', a: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', value2: 'val2'
        },
        {
            name: 'input text external change',
            node1: {t: 'input', a: {value: 'val1'}},
            node2: {t: 'input', a: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', valueExt1: 'val in1', value2: 'val2'
        },
        {
            name: 'textarea',
            node1: {t: 'textarea', a: {value: 'val1'}},
            node2: {t: 'textarea', a: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', value2: 'val2'
        },
        {
            name: 'textarea external change',
            node1: {t: 'textarea', a: {value: 'val1'}},
            node2: {t: 'textarea', a: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', valueExt1: 'val in1', value2: 'val2'
        },
        {
            name: 'checkbox',
            node1: {t: 'input', a: {type: 'checkbox', checked: false}},
            node2: {t: 'input', a: {type: 'checkbox', checked: true}},
            prop: 'checked',
            value1: false, value2: true
        },
        {
            name: 'radio',
            node1: {t: 'input', a: {type: 'radio', checked: true}},
            node2: {t: 'input', a: {type: 'radio', checked: false}},
            prop: 'checked',
            value1: true, value2: false
        }
    ];

    var selectDefs = [
        {
            name: 'option 1 selected',
            node: {t: 'select', c: [{t: 'option', a: {value: 'opt1', selected: true}}, {t: 'option', a: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'option 2 selected',
            node: {t: 'select', c: [{t: 'option', a: {value: 'opt1'}}, {t: 'option', a: {value: 'opt2', selected: true}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        },
        {
            name: 'selectedIndex 0',
            node: {t: 'select', a: {selectedIndex: 0}, c: [{t: 'option', a: {value: 'opt1'}}, {t: 'option', a: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'selectedIndex 1',
            node: {t: 'select', a: {selectedIndex: 1}, c: [{t: 'option', a: {value: 'opt1'}}, {t: 'option', a: {value: 'opt2'}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        },
        {
            name: 'value opt1',
            node: {t: 'select', a: {value: 'opt1'}, c: [{t: 'option', a: {value: 'opt1'}}, {t: 'option', a: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'value opt2',
            node: {t: 'select', a: {value: 'opt2'}, c: [{t: 'option', a: {value: 'opt1'}}, {t: 'option', a: {value: 'opt2'}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        }
    ];

    var callbackEventDescs,
        customEventHandler;
    var nodeWithNestedEvents = {
        t: 'div',
        e: {click: function (event) {
            callbackEventDescs.push('click outer');
            return customEventHandler && customEventHandler.call(this, event);
        }},
        c: {
            t: 'div',
            e: {click: [
                function (event) {
                    callbackEventDescs.push('click inner 1');
                    return customEventHandler && customEventHandler.call(this, event);
                },
                function (event) {
                    callbackEventDescs.push('click inner 2');
                    return customEventHandler && customEventHandler.call(this, event);
                }
            ]}
        }
    };

    describe('#update()', function () {
        it('tag name does not change parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {t: 'div'});
            expect(node.dom.parentNode).to.be(domParent);
            cito.vdom.update(node, {t: 'span'});
            expect(node.dom.parentNode).to.be(domParent);
        });

        describe('DOM', function () {
            _.forEach(domDefs, function (defs, groupName) {
                describe(groupName, function () {
                    forEachCombination(domDefs[groupName], function (def1, def2) {
                        if ((def1.updateOnlySelf || def2.updateOnlySelf) && def1 !== def2) {
                            return;
                        }
                        it(def1.name + ' -> ' + def2.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def1.node));
                            cito.vdom.update(node, _.cloneDeep(def2.node));
                            expect(node.dom).to.eqlDom(def2.html);
                            verifyNamespaces(node.dom, def2.namespaces);
                        });
                        it(def1.name + ' -> ' + def2.name + ' -> ' + def1.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def1.node));
                            cito.vdom.update(node, _.cloneDeep(def2.node));
                            cito.vdom.update(node, _.cloneDeep(def1.node));
                            expect(node.dom).to.eqlDom(def1.html);
                            verifyNamespaces(node.dom, def1.namespaces);
                        });
                    });
                });
            });


            it('should pass the shuffle vdom test', function () {
                var children1 = [{"key":0,"flags":0,"children":null},{"key":1,"flags":0,"children":null},{"key":2,"flags":0,"children":null},{"key":3,"flags":0,"children":null},{"key":4,"flags":0,"children":null},{"key":5,"flags":0,"children":null},{"key":6,"flags":0,"children":null},{"key":7,"flags":0,"children":null},{"key":8,"flags":0,"children":null},{"key":9,"flags":0,"children":null},{"key":10,"flags":0,"children":null},{"key":11,"flags":0,"children":null},{"key":12,"flags":0,"children":null},{"key":13,"flags":0,"children":null},{"key":14,"flags":0,"children":null},{"key":15,"flags":0,"children":null},{"key":16,"flags":0,"children":null},{"key":17,"flags":0,"children":null},{"key":18,"flags":0,"children":null},{"key":19,"flags":0,"children":null},{"key":20,"flags":0,"children":null},{"key":21,"flags":0,"children":null},{"key":22,"flags":0,"children":null},{"key":23,"flags":0,"children":null},{"key":24,"flags":0,"children":null},{"key":25,"flags":0,"children":null},{"key":26,"flags":0,"children":null},{"key":27,"flags":0,"children":null},{"key":28,"flags":0,"children":null},{"key":29,"flags":0,"children":null},{"key":30,"flags":0,"children":null},{"key":31,"flags":0,"children":null},{"key":32,"flags":0,"children":null},{"key":33,"flags":0,"children":null},{"key":34,"flags":0,"children":null},{"key":35,"flags":0,"children":null},{"key":36,"flags":0,"children":null},{"key":37,"flags":0,"children":null},{"key":38,"flags":0,"children":null},{"key":39,"flags":0,"children":null},{"key":40,"flags":0,"children":null},{"key":41,"flags":0,"children":null},{"key":42,"flags":0,"children":null},{"key":43,"flags":0,"children":null},{"key":44,"flags":0,"children":null},{"key":45,"flags":0,"children":null},{"key":46,"flags":0,"children":null},{"key":47,"flags":0,"children":null},{"key":48,"flags":0,"children":null},{"key":49,"flags":0,"children":null},{"key":50,"flags":0,"children":null},{"key":51,"flags":0,"children":null},{"key":52,"flags":0,"children":null},{"key":53,"flags":0,"children":null},{"key":54,"flags":0,"children":null},{"key":55,"flags":0,"children":null},{"key":56,"flags":0,"children":null},{"key":57,"flags":0,"children":null},{"key":58,"flags":0,"children":null},{"key":59,"flags":0,"children":null},{"key":60,"flags":0,"children":null},{"key":61,"flags":0,"children":null},{"key":62,"flags":0,"children":null},{"key":63,"flags":0,"children":null},{"key":64,"flags":0,"children":null},{"key":65,"flags":0,"children":null},{"key":66,"flags":0,"children":null},{"key":67,"flags":0,"children":null},{"key":68,"flags":0,"children":null},{"key":69,"flags":0,"children":null},{"key":70,"flags":0,"children":null},{"key":71,"flags":0,"children":null},{"key":72,"flags":0,"children":null},{"key":73,"flags":0,"children":null},{"key":74,"flags":0,"children":null},{"key":75,"flags":0,"children":null},{"key":76,"flags":0,"children":null},{"key":77,"flags":0,"children":null},{"key":78,"flags":0,"children":null},{"key":79,"flags":0,"children":null},{"key":80,"flags":0,"children":null},{"key":81,"flags":0,"children":null},{"key":82,"flags":0,"children":null},{"key":83,"flags":0,"children":null},{"key":84,"flags":0,"children":null},{"key":85,"flags":0,"children":null},{"key":86,"flags":0,"children":null},{"key":87,"flags":0,"children":null},{"key":88,"flags":0,"children":null},{"key":89,"flags":0,"children":null},{"key":90,"flags":0,"children":null},{"key":91,"flags":0,"children":null},{"key":92,"flags":0,"children":null},{"key":93,"flags":0,"children":null},{"key":94,"flags":0,"children":null},{"key":95,"flags":0,"children":null},{"key":96,"flags":0,"children":null},{"key":97,"flags":0,"children":null},{"key":98,"flags":0,"children":null},{"key":99,"flags":0,"children":null},{"key":100,"flags":0,"children":null},{"key":101,"flags":0,"children":null},{"key":102,"flags":0,"children":null},{"key":103,"flags":0,"children":null},{"key":104,"flags":0,"children":null},{"key":105,"flags":0,"children":null},{"key":106,"flags":0,"children":null},{"key":107,"flags":0,"children":null},{"key":108,"flags":0,"children":null},{"key":109,"flags":0,"children":null},{"key":110,"flags":0,"children":null},{"key":111,"flags":0,"children":null},{"key":112,"flags":0,"children":null},{"key":113,"flags":0,"children":null},{"key":114,"flags":0,"children":null},{"key":115,"flags":0,"children":null},{"key":116,"flags":0,"children":null},{"key":117,"flags":0,"children":null},{"key":118,"flags":0,"children":null},{"key":119,"flags":0,"children":null},{"key":120,"flags":0,"children":null},{"key":121,"flags":0,"children":null},{"key":122,"flags":0,"children":null},{"key":123,"flags":0,"children":null},{"key":124,"flags":0,"children":null},{"key":125,"flags":0,"children":null},{"key":126,"flags":0,"children":null},{"key":127,"flags":0,"children":null},{"key":128,"flags":0,"children":null},{"key":129,"flags":0,"children":null},{"key":130,"flags":0,"children":null},{"key":131,"flags":0,"children":null},{"key":132,"flags":0,"children":null},{"key":133,"flags":0,"children":null},{"key":134,"flags":0,"children":null},{"key":135,"flags":0,"children":null},{"key":136,"flags":0,"children":null},{"key":137,"flags":0,"children":null},{"key":138,"flags":0,"children":null},{"key":139,"flags":0,"children":null},{"key":140,"flags":0,"children":null},{"key":141,"flags":0,"children":null},{"key":142,"flags":0,"children":null},{"key":143,"flags":0,"children":null},{"key":144,"flags":0,"children":null},{"key":145,"flags":0,"children":null},{"key":146,"flags":0,"children":null},{"key":147,"flags":0,"children":null},{"key":148,"flags":0,"children":null},{"key":149,"flags":0,"children":null},{"key":150,"flags":0,"children":null},{"key":151,"flags":0,"children":null},{"key":152,"flags":0,"children":null},{"key":153,"flags":0,"children":null},{"key":154,"flags":0,"children":null},{"key":155,"flags":0,"children":null},{"key":156,"flags":0,"children":null},{"key":157,"flags":0,"children":null},{"key":158,"flags":0,"children":null},{"key":159,"flags":0,"children":null},{"key":160,"flags":0,"children":null},{"key":161,"flags":0,"children":null},{"key":162,"flags":0,"children":null},{"key":163,"flags":0,"children":null},{"key":164,"flags":0,"children":null},{"key":165,"flags":0,"children":null},{"key":166,"flags":0,"children":null},{"key":167,"flags":0,"children":null},{"key":168,"flags":0,"children":null},{"key":169,"flags":0,"children":null},{"key":170,"flags":0,"children":null},{"key":171,"flags":0,"children":null},{"key":172,"flags":0,"children":null},{"key":173,"flags":0,"children":null},{"key":174,"flags":0,"children":null},{"key":175,"flags":0,"children":null},{"key":176,"flags":0,"children":null},{"key":177,"flags":0,"children":null},{"key":178,"flags":0,"children":null},{"key":179,"flags":0,"children":null},{"key":180,"flags":0,"children":null},{"key":181,"flags":0,"children":null},{"key":182,"flags":0,"children":null},{"key":183,"flags":0,"children":null},{"key":184,"flags":0,"children":null},{"key":185,"flags":0,"children":null},{"key":186,"flags":0,"children":null},{"key":187,"flags":0,"children":null},{"key":188,"flags":0,"children":null},{"key":189,"flags":0,"children":null},{"key":190,"flags":0,"children":null},{"key":191,"flags":0,"children":null},{"key":192,"flags":0,"children":null},{"key":193,"flags":0,"children":null},{"key":194,"flags":0,"children":null},{"key":195,"flags":0,"children":null},{"key":196,"flags":0,"children":null},{"key":197,"flags":0,"children":null},{"key":198,"flags":0,"children":null},{"key":199,"flags":0,"children":null},{"key":200,"flags":0,"children":null},{"key":201,"flags":0,"children":null},{"key":202,"flags":0,"children":null},{"key":203,"flags":0,"children":null},{"key":204,"flags":0,"children":null},{"key":205,"flags":0,"children":null},{"key":206,"flags":0,"children":null},{"key":207,"flags":0,"children":null},{"key":208,"flags":0,"children":null},{"key":209,"flags":0,"children":null},{"key":210,"flags":0,"children":null},{"key":211,"flags":0,"children":null},{"key":212,"flags":0,"children":null},{"key":213,"flags":0,"children":null},{"key":214,"flags":0,"children":null},{"key":215,"flags":0,"children":null},{"key":216,"flags":0,"children":null},{"key":217,"flags":0,"children":null},{"key":218,"flags":0,"children":null},{"key":219,"flags":0,"children":null},{"key":220,"flags":0,"children":null},{"key":221,"flags":0,"children":null},{"key":222,"flags":0,"children":null},{"key":223,"flags":0,"children":null},{"key":224,"flags":0,"children":null},{"key":225,"flags":0,"children":null},{"key":226,"flags":0,"children":null},{"key":227,"flags":0,"children":null},{"key":228,"flags":0,"children":null},{"key":229,"flags":0,"children":null},{"key":230,"flags":0,"children":null},{"key":231,"flags":0,"children":null},{"key":232,"flags":0,"children":null},{"key":233,"flags":0,"children":null},{"key":234,"flags":0,"children":null},{"key":235,"flags":0,"children":null},{"key":236,"flags":0,"children":null},{"key":237,"flags":0,"children":null},{"key":238,"flags":0,"children":null},{"key":239,"flags":0,"children":null},{"key":240,"flags":0,"children":null},{"key":241,"flags":0,"children":null},{"key":242,"flags":0,"children":null},{"key":243,"flags":0,"children":null},{"key":244,"flags":0,"children":null},{"key":245,"flags":0,"children":null},{"key":246,"flags":0,"children":null},{"key":247,"flags":0,"children":null},{"key":248,"flags":0,"children":null},{"key":249,"flags":0,"children":null},{"key":250,"flags":0,"children":null},{"key":251,"flags":0,"children":null},{"key":252,"flags":0,"children":null},{"key":253,"flags":0,"children":null},{"key":254,"flags":0,"children":null},{"key":255,"flags":0,"children":null},{"key":256,"flags":0,"children":null},{"key":257,"flags":0,"children":null},{"key":258,"flags":0,"children":null},{"key":259,"flags":0,"children":null},{"key":260,"flags":0,"children":null},{"key":261,"flags":0,"children":null},{"key":262,"flags":0,"children":null},{"key":263,"flags":0,"children":null},{"key":264,"flags":0,"children":null},{"key":265,"flags":0,"children":null},{"key":266,"flags":0,"children":null},{"key":267,"flags":0,"children":null},{"key":268,"flags":0,"children":null},{"key":269,"flags":0,"children":null},{"key":270,"flags":0,"children":null},{"key":271,"flags":0,"children":null},{"key":272,"flags":0,"children":null},{"key":273,"flags":0,"children":null},{"key":274,"flags":0,"children":null},{"key":275,"flags":0,"children":null},{"key":276,"flags":0,"children":null},{"key":277,"flags":0,"children":null},{"key":278,"flags":0,"children":null},{"key":279,"flags":0,"children":null},{"key":280,"flags":0,"children":null},{"key":281,"flags":0,"children":null},{"key":282,"flags":0,"children":null},{"key":283,"flags":0,"children":null},{"key":284,"flags":0,"children":null},{"key":285,"flags":0,"children":null},{"key":286,"flags":0,"children":null},{"key":287,"flags":0,"children":null},{"key":288,"flags":0,"children":null},{"key":289,"flags":0,"children":null},{"key":290,"flags":0,"children":null},{"key":291,"flags":0,"children":null},{"key":292,"flags":0,"children":null},{"key":293,"flags":0,"children":null},{"key":294,"flags":0,"children":null},{"key":295,"flags":0,"children":null},{"key":296,"flags":0,"children":null},{"key":297,"flags":0,"children":null},{"key":298,"flags":0,"children":null},{"key":299,"flags":0,"children":null},{"key":300,"flags":0,"children":null},{"key":301,"flags":0,"children":null},{"key":302,"flags":0,"children":null},{"key":303,"flags":0,"children":null},{"key":304,"flags":0,"children":null},{"key":305,"flags":0,"children":null},{"key":306,"flags":0,"children":null},{"key":307,"flags":0,"children":null},{"key":308,"flags":0,"children":null},{"key":309,"flags":0,"children":null},{"key":310,"flags":0,"children":null},{"key":311,"flags":0,"children":null},{"key":312,"flags":0,"children":null},{"key":313,"flags":0,"children":null},{"key":314,"flags":0,"children":null},{"key":315,"flags":0,"children":null},{"key":316,"flags":0,"children":null},{"key":317,"flags":0,"children":null},{"key":318,"flags":0,"children":null},{"key":319,"flags":0,"children":null},{"key":320,"flags":0,"children":null},{"key":321,"flags":0,"children":null},{"key":322,"flags":0,"children":null},{"key":323,"flags":0,"children":null},{"key":324,"flags":0,"children":null},{"key":325,"flags":0,"children":null},{"key":326,"flags":0,"children":null},{"key":327,"flags":0,"children":null},{"key":328,"flags":0,"children":null},{"key":329,"flags":0,"children":null},{"key":330,"flags":0,"children":null},{"key":331,"flags":0,"children":null},{"key":332,"flags":0,"children":null},{"key":333,"flags":0,"children":null},{"key":334,"flags":0,"children":null},{"key":335,"flags":0,"children":null},{"key":336,"flags":0,"children":null},{"key":337,"flags":0,"children":null},{"key":338,"flags":0,"children":null},{"key":339,"flags":0,"children":null},{"key":340,"flags":0,"children":null},{"key":341,"flags":0,"children":null},{"key":342,"flags":0,"children":null},{"key":343,"flags":0,"children":null},{"key":344,"flags":0,"children":null},{"key":345,"flags":0,"children":null},{"key":346,"flags":0,"children":null},{"key":347,"flags":0,"children":null},{"key":348,"flags":0,"children":null},{"key":349,"flags":0,"children":null},{"key":350,"flags":0,"children":null},{"key":351,"flags":0,"children":null},{"key":352,"flags":0,"children":null},{"key":353,"flags":0,"children":null},{"key":354,"flags":0,"children":null},{"key":355,"flags":0,"children":null},{"key":356,"flags":0,"children":null},{"key":357,"flags":0,"children":null},{"key":358,"flags":0,"children":null},{"key":359,"flags":0,"children":null},{"key":360,"flags":0,"children":null},{"key":361,"flags":0,"children":null},{"key":362,"flags":0,"children":null},{"key":363,"flags":0,"children":null},{"key":364,"flags":0,"children":null},{"key":365,"flags":0,"children":null},{"key":366,"flags":0,"children":null},{"key":367,"flags":0,"children":null},{"key":368,"flags":0,"children":null},{"key":369,"flags":0,"children":null},{"key":370,"flags":0,"children":null},{"key":371,"flags":0,"children":null},{"key":372,"flags":0,"children":null},{"key":373,"flags":0,"children":null},{"key":374,"flags":0,"children":null},{"key":375,"flags":0,"children":null},{"key":376,"flags":0,"children":null},{"key":377,"flags":0,"children":null},{"key":378,"flags":0,"children":null},{"key":379,"flags":0,"children":null},{"key":380,"flags":0,"children":null},{"key":381,"flags":0,"children":null},{"key":382,"flags":0,"children":null},{"key":383,"flags":0,"children":null},{"key":384,"flags":0,"children":null},{"key":385,"flags":0,"children":null},{"key":386,"flags":0,"children":null},{"key":387,"flags":0,"children":null},{"key":388,"flags":0,"children":null},{"key":389,"flags":0,"children":null},{"key":390,"flags":0,"children":null},{"key":391,"flags":0,"children":null},{"key":392,"flags":0,"children":null},{"key":393,"flags":0,"children":null},{"key":394,"flags":0,"children":null},{"key":395,"flags":0,"children":null},{"key":396,"flags":0,"children":null},{"key":397,"flags":0,"children":null},{"key":398,"flags":0,"children":null},{"key":399,"flags":0,"children":null},{"key":400,"flags":0,"children":null},{"key":401,"flags":0,"children":null},{"key":402,"flags":0,"children":null},{"key":403,"flags":0,"children":null},{"key":404,"flags":0,"children":null},{"key":405,"flags":0,"children":null},{"key":406,"flags":0,"children":null},{"key":407,"flags":0,"children":null},{"key":408,"flags":0,"children":null},{"key":409,"flags":0,"children":null},{"key":410,"flags":0,"children":null},{"key":411,"flags":0,"children":null},{"key":412,"flags":0,"children":null},{"key":413,"flags":0,"children":null},{"key":414,"flags":0,"children":null},{"key":415,"flags":0,"children":null},{"key":416,"flags":0,"children":null},{"key":417,"flags":0,"children":null},{"key":418,"flags":0,"children":null},{"key":419,"flags":0,"children":null},{"key":420,"flags":0,"children":null},{"key":421,"flags":0,"children":null},{"key":422,"flags":0,"children":null},{"key":423,"flags":0,"children":null},{"key":424,"flags":0,"children":null},{"key":425,"flags":0,"children":null},{"key":426,"flags":0,"children":null},{"key":427,"flags":0,"children":null},{"key":428,"flags":0,"children":null},{"key":429,"flags":0,"children":null},{"key":430,"flags":0,"children":null},{"key":431,"flags":0,"children":null},{"key":432,"flags":0,"children":null},{"key":433,"flags":0,"children":null},{"key":434,"flags":0,"children":null},{"key":435,"flags":0,"children":null},{"key":436,"flags":0,"children":null},{"key":437,"flags":0,"children":null},{"key":438,"flags":0,"children":null},{"key":439,"flags":0,"children":null},{"key":440,"flags":0,"children":null},{"key":441,"flags":0,"children":null},{"key":442,"flags":0,"children":null},{"key":443,"flags":0,"children":null},{"key":444,"flags":0,"children":null},{"key":445,"flags":0,"children":null},{"key":446,"flags":0,"children":null},{"key":447,"flags":0,"children":null},{"key":448,"flags":0,"children":null},{"key":449,"flags":0,"children":null},{"key":450,"flags":0,"children":null},{"key":451,"flags":0,"children":null},{"key":452,"flags":0,"children":null},{"key":453,"flags":0,"children":null},{"key":454,"flags":0,"children":null},{"key":455,"flags":0,"children":null},{"key":456,"flags":0,"children":null},{"key":457,"flags":0,"children":null},{"key":458,"flags":0,"children":null},{"key":459,"flags":0,"children":null},{"key":460,"flags":0,"children":null},{"key":461,"flags":0,"children":null},{"key":462,"flags":0,"children":null},{"key":463,"flags":0,"children":null},{"key":464,"flags":0,"children":null},{"key":465,"flags":0,"children":null},{"key":466,"flags":0,"children":null},{"key":467,"flags":0,"children":null},{"key":468,"flags":0,"children":null},{"key":469,"flags":0,"children":null},{"key":470,"flags":0,"children":null},{"key":471,"flags":0,"children":null},{"key":472,"flags":0,"children":null},{"key":473,"flags":0,"children":null},{"key":474,"flags":0,"children":null},{"key":475,"flags":0,"children":null},{"key":476,"flags":0,"children":null},{"key":477,"flags":0,"children":null},{"key":478,"flags":0,"children":null},{"key":479,"flags":0,"children":null},{"key":480,"flags":0,"children":null},{"key":481,"flags":0,"children":null},{"key":482,"flags":0,"children":null},{"key":483,"flags":0,"children":null},{"key":484,"flags":0,"children":null},{"key":485,"flags":0,"children":null},{"key":486,"flags":0,"children":null},{"key":487,"flags":0,"children":null},{"key":488,"flags":0,"children":null},{"key":489,"flags":0,"children":null},{"key":490,"flags":0,"children":null},{"key":491,"flags":0,"children":null},{"key":492,"flags":0,"children":null},{"key":493,"flags":0,"children":null},{"key":494,"flags":0,"children":null},{"key":495,"flags":0,"children":null},{"key":496,"flags":0,"children":null},{"key":497,"flags":0,"children":null},{"key":498,"flags":0,"children":null},{"key":499,"flags":0,"children":null}];
                var children2 = [{"key":153,"flags":0,"children":null},{"key":355,"flags":0,"children":null},{"key":344,"flags":0,"children":null},{"key":229,"flags":0,"children":null},{"key":266,"flags":0,"children":null},{"key":409,"flags":0,"children":null},{"key":375,"flags":0,"children":null},{"key":311,"flags":0,"children":null},{"key":497,"flags":0,"children":null},{"key":50,"flags":0,"children":null},{"key":265,"flags":0,"children":null},{"key":10,"flags":0,"children":null},{"key":38,"flags":0,"children":null},{"key":180,"flags":0,"children":null},{"key":379,"flags":0,"children":null},{"key":157,"flags":0,"children":null},{"key":152,"flags":0,"children":null},{"key":323,"flags":0,"children":null},{"key":190,"flags":0,"children":null},{"key":309,"flags":0,"children":null},{"key":39,"flags":0,"children":null},{"key":170,"flags":0,"children":null},{"key":486,"flags":0,"children":null},{"key":262,"flags":0,"children":null},{"key":327,"flags":0,"children":null},{"key":256,"flags":0,"children":null},{"key":299,"flags":0,"children":null},{"key":95,"flags":0,"children":null},{"key":78,"flags":0,"children":null},{"key":346,"flags":0,"children":null},{"key":181,"flags":0,"children":null},{"key":204,"flags":0,"children":null},{"key":127,"flags":0,"children":null},{"key":91,"flags":0,"children":null},{"key":422,"flags":0,"children":null},{"key":429,"flags":0,"children":null},{"key":424,"flags":0,"children":null},{"key":348,"flags":0,"children":null},{"key":365,"flags":0,"children":null},{"key":59,"flags":0,"children":null},{"key":397,"flags":0,"children":null},{"key":427,"flags":0,"children":null},{"key":151,"flags":0,"children":null},{"key":175,"flags":0,"children":null},{"key":441,"flags":0,"children":null},{"key":341,"flags":0,"children":null},{"key":251,"flags":0,"children":null},{"key":461,"flags":0,"children":null},{"key":236,"flags":0,"children":null},{"key":99,"flags":0,"children":null},{"key":380,"flags":0,"children":null},{"key":144,"flags":0,"children":null},{"key":319,"flags":0,"children":null},{"key":482,"flags":0,"children":null},{"key":307,"flags":0,"children":null},{"key":126,"flags":0,"children":null},{"key":55,"flags":0,"children":null},{"key":356,"flags":0,"children":null},{"key":224,"flags":0,"children":null},{"key":61,"flags":0,"children":null},{"key":128,"flags":0,"children":null},{"key":326,"flags":0,"children":null},{"key":296,"flags":0,"children":null},{"key":472,"flags":0,"children":null},{"key":217,"flags":0,"children":null},{"key":130,"flags":0,"children":null},{"key":374,"flags":0,"children":null},{"key":166,"flags":0,"children":null},{"key":219,"flags":0,"children":null},{"key":469,"flags":0,"children":null},{"key":137,"flags":0,"children":null},{"key":454,"flags":0,"children":null},{"key":335,"flags":0,"children":null},{"key":403,"flags":0,"children":null},{"key":89,"flags":0,"children":null},{"key":328,"flags":0,"children":null},{"key":345,"flags":0,"children":null},{"key":412,"flags":0,"children":null},{"key":293,"flags":0,"children":null},{"key":70,"flags":0,"children":null},{"key":168,"flags":0,"children":null},{"key":444,"flags":0,"children":null},{"key":433,"flags":0,"children":null},{"key":114,"flags":0,"children":null},{"key":475,"flags":0,"children":null},{"key":202,"flags":0,"children":null},{"key":487,"flags":0,"children":null},{"key":499,"flags":0,"children":null},{"key":184,"flags":0,"children":null},{"key":340,"flags":0,"children":null},{"key":194,"flags":0,"children":null},{"key":191,"flags":0,"children":null},{"key":45,"flags":0,"children":null},{"key":65,"flags":0,"children":null},{"key":402,"flags":0,"children":null},{"key":399,"flags":0,"children":null},{"key":261,"flags":0,"children":null},{"key":149,"flags":0,"children":null},{"key":27,"flags":0,"children":null},{"key":331,"flags":0,"children":null},{"key":131,"flags":0,"children":null},{"key":485,"flags":0,"children":null},{"key":273,"flags":0,"children":null},{"key":491,"flags":0,"children":null},{"key":310,"flags":0,"children":null},{"key":193,"flags":0,"children":null},{"key":3,"flags":0,"children":null},{"key":5,"flags":0,"children":null},{"key":34,"flags":0,"children":null},{"key":385,"flags":0,"children":null},{"key":4,"flags":0,"children":null},{"key":24,"flags":0,"children":null},{"key":121,"flags":0,"children":null},{"key":47,"flags":0,"children":null},{"key":493,"flags":0,"children":null},{"key":391,"flags":0,"children":null},{"key":395,"flags":0,"children":null},{"key":195,"flags":0,"children":null},{"key":225,"flags":0,"children":null},{"key":60,"flags":0,"children":null},{"key":483,"flags":0,"children":null},{"key":124,"flags":0,"children":null},{"key":460,"flags":0,"children":null},{"key":226,"flags":0,"children":null},{"key":426,"flags":0,"children":null},{"key":457,"flags":0,"children":null},{"key":250,"flags":0,"children":null},{"key":25,"flags":0,"children":null},{"key":198,"flags":0,"children":null},{"key":74,"flags":0,"children":null},{"key":393,"flags":0,"children":null},{"key":474,"flags":0,"children":null},{"key":88,"flags":0,"children":null},{"key":134,"flags":0,"children":null},{"key":163,"flags":0,"children":null},{"key":164,"flags":0,"children":null},{"key":23,"flags":0,"children":null},{"key":308,"flags":0,"children":null},{"key":329,"flags":0,"children":null},{"key":141,"flags":0,"children":null},{"key":197,"flags":0,"children":null},{"key":298,"flags":0,"children":null},{"key":274,"flags":0,"children":null},{"key":183,"flags":0,"children":null},{"key":82,"flags":0,"children":null},{"key":40,"flags":0,"children":null},{"key":361,"flags":0,"children":null},{"key":449,"flags":0,"children":null},{"key":445,"flags":0,"children":null},{"key":271,"flags":0,"children":null},{"key":115,"flags":0,"children":null},{"key":489,"flags":0,"children":null},{"key":138,"flags":0,"children":null},{"key":342,"flags":0,"children":null},{"key":435,"flags":0,"children":null},{"key":488,"flags":0,"children":null},{"key":187,"flags":0,"children":null},{"key":304,"flags":0,"children":null},{"key":371,"flags":0,"children":null},{"key":145,"flags":0,"children":null},{"key":179,"flags":0,"children":null},{"key":291,"flags":0,"children":null},{"key":257,"flags":0,"children":null},{"key":41,"flags":0,"children":null},{"key":19,"flags":0,"children":null},{"key":244,"flags":0,"children":null},{"key":378,"flags":0,"children":null},{"key":110,"flags":0,"children":null},{"key":373,"flags":0,"children":null},{"key":294,"flags":0,"children":null},{"key":334,"flags":0,"children":null},{"key":200,"flags":0,"children":null},{"key":132,"flags":0,"children":null},{"key":357,"flags":0,"children":null},{"key":136,"flags":0,"children":null},{"key":282,"flags":0,"children":null},{"key":410,"flags":0,"children":null},{"key":37,"flags":0,"children":null},{"key":22,"flags":0,"children":null},{"key":178,"flags":0,"children":null},{"key":498,"flags":0,"children":null},{"key":394,"flags":0,"children":null},{"key":215,"flags":0,"children":null},{"key":117,"flags":0,"children":null},{"key":62,"flags":0,"children":null},{"key":450,"flags":0,"children":null},{"key":252,"flags":0,"children":null},{"key":312,"flags":0,"children":null},{"key":16,"flags":0,"children":null},{"key":370,"flags":0,"children":null},{"key":212,"flags":0,"children":null},{"key":392,"flags":0,"children":null},{"key":20,"flags":0,"children":null},{"key":94,"flags":0,"children":null},{"key":102,"flags":0,"children":null},{"key":286,"flags":0,"children":null},{"key":452,"flags":0,"children":null},{"key":220,"flags":0,"children":null},{"key":108,"flags":0,"children":null},{"key":112,"flags":0,"children":null},{"key":160,"flags":0,"children":null},{"key":408,"flags":0,"children":null},{"key":468,"flags":0,"children":null},{"key":133,"flags":0,"children":null},{"key":90,"flags":0,"children":null},{"key":85,"flags":0,"children":null},{"key":281,"flags":0,"children":null},{"key":216,"flags":0,"children":null},{"key":169,"flags":0,"children":null},{"key":381,"flags":0,"children":null},{"key":245,"flags":0,"children":null},{"key":9,"flags":0,"children":null},{"key":57,"flags":0,"children":null},{"key":232,"flags":0,"children":null},{"key":396,"flags":0,"children":null},{"key":284,"flags":0,"children":null},{"key":496,"flags":0,"children":null},{"key":481,"flags":0,"children":null},{"key":376,"flags":0,"children":null},{"key":416,"flags":0,"children":null},{"key":234,"flags":0,"children":null},{"key":317,"flags":0,"children":null},{"key":122,"flags":0,"children":null},{"key":389,"flags":0,"children":null},{"key":146,"flags":0,"children":null},{"key":43,"flags":0,"children":null},{"key":253,"flags":0,"children":null},{"key":438,"flags":0,"children":null},{"key":446,"flags":0,"children":null},{"key":456,"flags":0,"children":null},{"key":52,"flags":0,"children":null},{"key":53,"flags":0,"children":null},{"key":12,"flags":0,"children":null},{"key":455,"flags":0,"children":null},{"key":87,"flags":0,"children":null},{"key":249,"flags":0,"children":null},{"key":358,"flags":0,"children":null},{"key":237,"flags":0,"children":null},{"key":301,"flags":0,"children":null},{"key":292,"flags":0,"children":null},{"key":105,"flags":0,"children":null},{"key":227,"flags":0,"children":null},{"key":338,"flags":0,"children":null},{"key":148,"flags":0,"children":null},{"key":278,"flags":0,"children":null},{"key":7,"flags":0,"children":null},{"key":364,"flags":0,"children":null},{"key":280,"flags":0,"children":null},{"key":336,"flags":0,"children":null},{"key":68,"flags":0,"children":null},{"key":71,"flags":0,"children":null},{"key":185,"flags":0,"children":null},{"key":269,"flags":0,"children":null},{"key":465,"flags":0,"children":null},{"key":1,"flags":0,"children":null},{"key":35,"flags":0,"children":null},{"key":73,"flags":0,"children":null},{"key":189,"flags":0,"children":null},{"key":139,"flags":0,"children":null},{"key":167,"flags":0,"children":null},{"key":440,"flags":0,"children":null},{"key":118,"flags":0,"children":null},{"key":442,"flags":0,"children":null},{"key":177,"flags":0,"children":null},{"key":414,"flags":0,"children":null},{"key":100,"flags":0,"children":null},{"key":405,"flags":0,"children":null},{"key":388,"flags":0,"children":null},{"key":159,"flags":0,"children":null},{"key":448,"flags":0,"children":null},{"key":313,"flags":0,"children":null},{"key":48,"flags":0,"children":null},{"key":362,"flags":0,"children":null},{"key":46,"flags":0,"children":null},{"key":400,"flags":0,"children":null},{"key":333,"flags":0,"children":null},{"key":353,"flags":0,"children":null},{"key":477,"flags":0,"children":null},{"key":83,"flags":0,"children":null},{"key":241,"flags":0,"children":null},{"key":494,"flags":0,"children":null},{"key":315,"flags":0,"children":null},{"key":354,"flags":0,"children":null},{"key":419,"flags":0,"children":null},{"key":69,"flags":0,"children":null},{"key":123,"flags":0,"children":null},{"key":425,"flags":0,"children":null},{"key":287,"flags":0,"children":null},{"key":42,"flags":0,"children":null},{"key":119,"flags":0,"children":null},{"key":84,"flags":0,"children":null},{"key":268,"flags":0,"children":null},{"key":473,"flags":0,"children":null},{"key":28,"flags":0,"children":null},{"key":277,"flags":0,"children":null},{"key":143,"flags":0,"children":null},{"key":196,"flags":0,"children":null},{"key":58,"flags":0,"children":null},{"key":343,"flags":0,"children":null},{"key":6,"flags":0,"children":null},{"key":411,"flags":0,"children":null},{"key":239,"flags":0,"children":null},{"key":337,"flags":0,"children":null},{"key":318,"flags":0,"children":null},{"key":107,"flags":0,"children":null},{"key":221,"flags":0,"children":null},{"key":492,"flags":0,"children":null},{"key":464,"flags":0,"children":null},{"key":417,"flags":0,"children":null},{"key":92,"flags":0,"children":null},{"key":172,"flags":0,"children":null},{"key":246,"flags":0,"children":null},{"key":366,"flags":0,"children":null},{"key":470,"flags":0,"children":null},{"key":368,"flags":0,"children":null},{"key":49,"flags":0,"children":null},{"key":8,"flags":0,"children":null},{"key":103,"flags":0,"children":null},{"key":211,"flags":0,"children":null},{"key":111,"flags":0,"children":null},{"key":26,"flags":0,"children":null},{"key":210,"flags":0,"children":null},{"key":270,"flags":0,"children":null},{"key":156,"flags":0,"children":null},{"key":401,"flags":0,"children":null},{"key":67,"flags":0,"children":null},{"key":386,"flags":0,"children":null},{"key":288,"flags":0,"children":null},{"key":238,"flags":0,"children":null},{"key":98,"flags":0,"children":null},{"key":383,"flags":0,"children":null},{"key":171,"flags":0,"children":null},{"key":81,"flags":0,"children":null},{"key":290,"flags":0,"children":null},{"key":360,"flags":0,"children":null},{"key":125,"flags":0,"children":null},{"key":162,"flags":0,"children":null},{"key":322,"flags":0,"children":null},{"key":214,"flags":0,"children":null},{"key":302,"flags":0,"children":null},{"key":325,"flags":0,"children":null},{"key":243,"flags":0,"children":null},{"key":314,"flags":0,"children":null},{"key":11,"flags":0,"children":null},{"key":420,"flags":0,"children":null},{"key":248,"flags":0,"children":null},{"key":453,"flags":0,"children":null},{"key":272,"flags":0,"children":null},{"key":369,"flags":0,"children":null},{"key":490,"flags":0,"children":null},{"key":135,"flags":0,"children":null},{"key":459,"flags":0,"children":null},{"key":31,"flags":0,"children":null},{"key":106,"flags":0,"children":null},{"key":208,"flags":0,"children":null},{"key":247,"flags":0,"children":null},{"key":228,"flags":0,"children":null},{"key":434,"flags":0,"children":null},{"key":206,"flags":0,"children":null},{"key":303,"flags":0,"children":null},{"key":113,"flags":0,"children":null},{"key":404,"flags":0,"children":null},{"key":64,"flags":0,"children":null},{"key":218,"flags":0,"children":null},{"key":350,"flags":0,"children":null},{"key":406,"flags":0,"children":null},{"key":283,"flags":0,"children":null},{"key":432,"flags":0,"children":null},{"key":205,"flags":0,"children":null},{"key":56,"flags":0,"children":null},{"key":116,"flags":0,"children":null},{"key":349,"flags":0,"children":null},{"key":495,"flags":0,"children":null},{"key":418,"flags":0,"children":null},{"key":155,"flags":0,"children":null},{"key":478,"flags":0,"children":null},{"key":267,"flags":0,"children":null},{"key":201,"flags":0,"children":null},{"key":186,"flags":0,"children":null},{"key":300,"flags":0,"children":null},{"key":188,"flags":0,"children":null},{"key":367,"flags":0,"children":null},{"key":384,"flags":0,"children":null},{"key":17,"flags":0,"children":null},{"key":407,"flags":0,"children":null},{"key":30,"flags":0,"children":null},{"key":44,"flags":0,"children":null},{"key":421,"flags":0,"children":null},{"key":96,"flags":0,"children":null},{"key":142,"flags":0,"children":null},{"key":275,"flags":0,"children":null},{"key":436,"flags":0,"children":null},{"key":13,"flags":0,"children":null},{"key":72,"flags":0,"children":null},{"key":258,"flags":0,"children":null},{"key":305,"flags":0,"children":null},{"key":347,"flags":0,"children":null},{"key":173,"flags":0,"children":null},{"key":430,"flags":0,"children":null},{"key":140,"flags":0,"children":null},{"key":161,"flags":0,"children":null},{"key":230,"flags":0,"children":null},{"key":0,"flags":0,"children":null},{"key":484,"flags":0,"children":null},{"key":259,"flags":0,"children":null},{"key":203,"flags":0,"children":null},{"key":276,"flags":0,"children":null},{"key":351,"flags":0,"children":null},{"key":36,"flags":0,"children":null},{"key":463,"flags":0,"children":null},{"key":255,"flags":0,"children":null},{"key":476,"flags":0,"children":null},{"key":2,"flags":0,"children":null},{"key":213,"flags":0,"children":null},{"key":233,"flags":0,"children":null},{"key":479,"flags":0,"children":null},{"key":462,"flags":0,"children":null},{"key":437,"flags":0,"children":null},{"key":15,"flags":0,"children":null},{"key":51,"flags":0,"children":null},{"key":458,"flags":0,"children":null},{"key":158,"flags":0,"children":null},{"key":97,"flags":0,"children":null},{"key":451,"flags":0,"children":null},{"key":231,"flags":0,"children":null},{"key":466,"flags":0,"children":null},{"key":443,"flags":0,"children":null},{"key":295,"flags":0,"children":null},{"key":264,"flags":0,"children":null},{"key":390,"flags":0,"children":null},{"key":209,"flags":0,"children":null},{"key":415,"flags":0,"children":null},{"key":359,"flags":0,"children":null},{"key":93,"flags":0,"children":null},{"key":254,"flags":0,"children":null},{"key":75,"flags":0,"children":null},{"key":480,"flags":0,"children":null},{"key":413,"flags":0,"children":null},{"key":207,"flags":0,"children":null},{"key":174,"flags":0,"children":null},{"key":199,"flags":0,"children":null},{"key":428,"flags":0,"children":null},{"key":306,"flags":0,"children":null},{"key":297,"flags":0,"children":null},{"key":240,"flags":0,"children":null},{"key":129,"flags":0,"children":null},{"key":109,"flags":0,"children":null},{"key":235,"flags":0,"children":null},{"key":33,"flags":0,"children":null},{"key":150,"flags":0,"children":null},{"key":263,"flags":0,"children":null},{"key":279,"flags":0,"children":null},{"key":192,"flags":0,"children":null},{"key":101,"flags":0,"children":null},{"key":387,"flags":0,"children":null},{"key":80,"flags":0,"children":null},{"key":320,"flags":0,"children":null},{"key":77,"flags":0,"children":null},{"key":439,"flags":0,"children":null},{"key":330,"flags":0,"children":null},{"key":423,"flags":0,"children":null},{"key":260,"flags":0,"children":null},{"key":176,"flags":0,"children":null},{"key":165,"flags":0,"children":null},{"key":79,"flags":0,"children":null},{"key":223,"flags":0,"children":null},{"key":54,"flags":0,"children":null},{"key":332,"flags":0,"children":null},{"key":471,"flags":0,"children":null},{"key":63,"flags":0,"children":null},{"key":467,"flags":0,"children":null},{"key":447,"flags":0,"children":null},{"key":66,"flags":0,"children":null},{"key":21,"flags":0,"children":null},{"key":32,"flags":0,"children":null},{"key":86,"flags":0,"children":null},{"key":372,"flags":0,"children":null},{"key":431,"flags":0,"children":null},{"key":285,"flags":0,"children":null},{"key":289,"flags":0,"children":null},{"key":154,"flags":0,"children":null},{"key":377,"flags":0,"children":null},{"key":18,"flags":0,"children":null},{"key":242,"flags":0,"children":null},{"key":398,"flags":0,"children":null},{"key":324,"flags":0,"children":null},{"key":339,"flags":0,"children":null},{"key":76,"flags":0,"children":null},{"key":222,"flags":0,"children":null},{"key":363,"flags":0,"children":null},{"key":120,"flags":0,"children":null},{"key":14,"flags":0,"children":null},{"key":382,"flags":0,"children":null},{"key":147,"flags":0,"children":null},{"key":104,"flags":0,"children":null},{"key":352,"flags":0,"children":null},{"key":321,"flags":0,"children":null},{"key":182,"flags":0,"children":null},{"key":29,"flags":0,"children":null},{"key":316,"flags":0,"children":null}];
                var html2 = '<div><span>153</span><span>355</span><span>344</span><span>229</span><span>266</span><span>409</span><span>375</span><span>311</span><span>497</span><span>50</span><span>265</span><span>10</span><span>38</span><span>180</span><span>379</span><span>157</span><span>152</span><span>323</span><span>190</span><span>309</span><span>39</span><span>170</span><span>486</span><span>262</span><span>327</span><span>256</span><span>299</span><span>95</span><span>78</span><span>346</span><span>181</span><span>204</span><span>127</span><span>91</span><span>422</span><span>429</span><span>424</span><span>348</span><span>365</span><span>59</span><span>397</span><span>427</span><span>151</span><span>175</span><span>441</span><span>341</span><span>251</span><span>461</span><span>236</span><span>99</span><span>380</span><span>144</span><span>319</span><span>482</span><span>307</span><span>126</span><span>55</span><span>356</span><span>224</span><span>61</span><span>128</span><span>326</span><span>296</span><span>472</span><span>217</span><span>130</span><span>374</span><span>166</span><span>219</span><span>469</span><span>137</span><span>454</span><span>335</span><span>403</span><span>89</span><span>328</span><span>345</span><span>412</span><span>293</span><span>70</span><span>168</span><span>444</span><span>433</span><span>114</span><span>475</span><span>202</span><span>487</span><span>499</span><span>184</span><span>340</span><span>194</span><span>191</span><span>45</span><span>65</span><span>402</span><span>399</span><span>261</span><span>149</span><span>27</span><span>331</span><span>131</span><span>485</span><span>273</span><span>491</span><span>310</span><span>193</span><span>3</span><span>5</span><span>34</span><span>385</span><span>4</span><span>24</span><span>121</span><span>47</span><span>493</span><span>391</span><span>395</span><span>195</span><span>225</span><span>60</span><span>483</span><span>124</span><span>460</span><span>226</span><span>426</span><span>457</span><span>250</span><span>25</span><span>198</span><span>74</span><span>393</span><span>474</span><span>88</span><span>134</span><span>163</span><span>164</span><span>23</span><span>308</span><span>329</span><span>141</span><span>197</span><span>298</span><span>274</span><span>183</span><span>82</span><span>40</span><span>361</span><span>449</span><span>445</span><span>271</span><span>115</span><span>489</span><span>138</span><span>342</span><span>435</span><span>488</span><span>187</span><span>304</span><span>371</span><span>145</span><span>179</span><span>291</span><span>257</span><span>41</span><span>19</span><span>244</span><span>378</span><span>110</span><span>373</span><span>294</span><span>334</span><span>200</span><span>132</span><span>357</span><span>136</span><span>282</span><span>410</span><span>37</span><span>22</span><span>178</span><span>498</span><span>394</span><span>215</span><span>117</span><span>62</span><span>450</span><span>252</span><span>312</span><span>16</span><span>370</span><span>212</span><span>392</span><span>20</span><span>94</span><span>102</span><span>286</span><span>452</span><span>220</span><span>108</span><span>112</span><span>160</span><span>408</span><span>468</span><span>133</span><span>90</span><span>85</span><span>281</span><span>216</span><span>169</span><span>381</span><span>245</span><span>9</span><span>57</span><span>232</span><span>396</span><span>284</span><span>496</span><span>481</span><span>376</span><span>416</span><span>234</span><span>317</span><span>122</span><span>389</span><span>146</span><span>43</span><span>253</span><span>438</span><span>446</span><span>456</span><span>52</span><span>53</span><span>12</span><span>455</span><span>87</span><span>249</span><span>358</span><span>237</span><span>301</span><span>292</span><span>105</span><span>227</span><span>338</span><span>148</span><span>278</span><span>7</span><span>364</span><span>280</span><span>336</span><span>68</span><span>71</span><span>185</span><span>269</span><span>465</span><span>1</span><span>35</span><span>73</span><span>189</span><span>139</span><span>167</span><span>440</span><span>118</span><span>442</span><span>177</span><span>414</span><span>100</span><span>405</span><span>388</span><span>159</span><span>448</span><span>313</span><span>48</span><span>362</span><span>46</span><span>400</span><span>333</span><span>353</span><span>477</span><span>83</span><span>241</span><span>494</span><span>315</span><span>354</span><span>419</span><span>69</span><span>123</span><span>425</span><span>287</span><span>42</span><span>119</span><span>84</span><span>268</span><span>473</span><span>28</span><span>277</span><span>143</span><span>196</span><span>58</span><span>343</span><span>6</span><span>411</span><span>239</span><span>337</span><span>318</span><span>107</span><span>221</span><span>492</span><span>464</span><span>417</span><span>92</span><span>172</span><span>246</span><span>366</span><span>470</span><span>368</span><span>49</span><span>8</span><span>103</span><span>211</span><span>111</span><span>26</span><span>210</span><span>270</span><span>156</span><span>401</span><span>67</span><span>386</span><span>288</span><span>238</span><span>98</span><span>383</span><span>171</span><span>81</span><span>290</span><span>360</span><span>125</span><span>162</span><span>322</span><span>214</span><span>302</span><span>325</span><span>243</span><span>314</span><span>11</span><span>420</span><span>248</span><span>453</span><span>272</span><span>369</span><span>490</span><span>135</span><span>459</span><span>31</span><span>106</span><span>208</span><span>247</span><span>228</span><span>434</span><span>206</span><span>303</span><span>113</span><span>404</span><span>64</span><span>218</span><span>350</span><span>406</span><span>283</span><span>432</span><span>205</span><span>56</span><span>116</span><span>349</span><span>495</span><span>418</span><span>155</span><span>478</span><span>267</span><span>201</span><span>186</span><span>300</span><span>188</span><span>367</span><span>384</span><span>17</span><span>407</span><span>30</span><span>44</span><span>421</span><span>96</span><span>142</span><span>275</span><span>436</span><span>13</span><span>72</span><span>258</span><span>305</span><span>347</span><span>173</span><span>430</span><span>140</span><span>161</span><span>230</span><span>0</span><span>484</span><span>259</span><span>203</span><span>276</span><span>351</span><span>36</span><span>463</span><span>255</span><span>476</span><span>2</span><span>213</span><span>233</span><span>479</span><span>462</span><span>437</span><span>15</span><span>51</span><span>458</span><span>158</span><span>97</span><span>451</span><span>231</span><span>466</span><span>443</span><span>295</span><span>264</span><span>390</span><span>209</span><span>415</span><span>359</span><span>93</span><span>254</span><span>75</span><span>480</span><span>413</span><span>207</span><span>174</span><span>199</span><span>428</span><span>306</span><span>297</span><span>240</span><span>129</span><span>109</span><span>235</span><span>33</span><span>150</span><span>263</span><span>279</span><span>192</span><span>101</span><span>387</span><span>80</span><span>320</span><span>77</span><span>439</span><span>330</span><span>423</span><span>260</span><span>176</span><span>165</span><span>79</span><span>223</span><span>54</span><span>332</span><span>471</span><span>63</span><span>467</span><span>447</span><span>66</span><span>21</span><span>32</span><span>86</span><span>372</span><span>431</span><span>285</span><span>289</span><span>154</span><span>377</span><span>18</span><span>242</span><span>398</span><span>324</span><span>339</span><span>76</span><span>222</span><span>363</span><span>120</span><span>14</span><span>382</span><span>147</span><span>104</span><span>352</span><span>321</span><span>182</span><span>29</span><span>316</span></div>';

                function createNode(children) {
                    return {
                        t: 'div', c: _.map(children, function (child) {
                            return {t: 'span', key: child.key, c: '' + child.key.toString()};
                        })
                    };
                }

                var node = cito.vdom.create(createNode(children1));
                cito.vdom.update(node, createNode(children2));

                expect(node.dom.outerHTML).to.be(html2);
            });

        });

        describe('DOM callbacks', function () {
            beforeEach(function () {
                callbackOldNodes = [];
            });
            afterEach(function () {
                callbackOldNodes = undefined;
            });

            _.forEach(domDefs['callback'], function (def) {
                it(def.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def.node));
                    callbackOldNodes = [];
                    cito.vdom.update(node, _.cloneDeep(def.node));
                    expect(normNodes(callbackOldNodes)).to.eql(normNodes(def.oldNodes));
                });
            });
        });

        describe('input properties', function () {
            _.forEach(inputPropDefs, function (def) {
                it(def.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def.node1));
                    expect(node.dom[def.prop]).to.be(def.value1);
                    if (def.valueExt1) {
                        node.dom[def.prop] = def.valueExt1;
                        expect(node.dom[def.prop]).to.be(def.valueExt1);
                    }
                    cito.vdom.update(node, _.cloneDeep(def.node2));
                    expect(node.dom[def.prop]).to.be(def.value2);
                });
            });
        });

        describe('select element', function () {
            forEachCombination(selectDefs, function (def1, def2) {
                it(def1.name + ' -> ' + def2.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def1.node)),
                        prop;
                    for (prop in def1.props) {
                        expect(node.dom[prop]).to.be(def1.props[prop]);
                    }
                    cito.vdom.update(node, _.cloneDeep(def2.node));
                    for (prop in def2.props) {
                        expect(node.dom[prop]).to.be(def2.props[prop]);
                    }
                });
            });
        });

        it('maintains focus', function () {
            var node;
            after(function () {
                cito.vdom.remove(node);
            });

            node = cito.vdom.append(document.body, {
                t: 'div',
                c: [
                    {t: 'input', key: 0},
                    {t: 'span', key: 1}
                ]
            });

            var input = node.dom.firstChild;
            input.focus();
            expect(input).to.be(document.activeElement);

            cito.vdom.update(node, {
                t: 'div',
                c: [
                    {t: 'span', key: 1},
                    {t: 'input', key: 0}
                ]
            });

            expect(input).to.be(document.activeElement);
        });
    });

    describe('#append()', function () {
        it('appends node to parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {t: 'div'});

            expect(node.dom.parentNode).to.be(domParent);
            expect(domParent.childNodes.length).to.be(1);

            cito.vdom.remove(node);
        });
    });

    describe('#remove()', function () {
        it('removed node from parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {t: 'div'});
            cito.vdom.remove(node);

            try {
                expect(node.dom.parentNode).to.be(null);
            } catch (e) {
                expect(node.dom.parentNode.tagName).to.be(undefined); // IE6
            }
            expect(domParent.childNodes.length).to.be(0);
        });

        describe('destroys virtual node', function () {
            var node;
            beforeEach(function () {
                node = cito.vdom.append(document.body, _.cloneDeep(nodeWithNestedEvents));
            });

            it('properties', function () {
                expect(node.dom.virtualNode).to.be(node);
                expect(node.dom.firstChild.virtualNode).to.be(node.children);

                var domParent = node.dom, domChild = domParent.firstChild;
                cito.vdom.remove(node);

                expect(domParent.virtualNode).to.be(undefined);
                expect(domChild.virtualNode).to.be(undefined);
            });

            it('event handlers', function () {
                callbackEventDescs = [];
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.have.length(3);

                var domChild = node.dom.firstChild;
                callbackEventDescs = [];
                cito.vdom.remove(node);

                dispatchEvent(domChild, createEvent('click'));
                expect(callbackEventDescs).to.have.length(0);
            });
        });
    });

    var callbackEventTypes;
    function testEventHandler(event) {
        callbackEventTypes.push(event.type);
    }
    function testExceptionEventHandler(event) {
        callbackEventTypes.push(event.type);
        throw new Error();
    }

    var eventDefs = [
        {
            name: 'none',
            node: {t: 'div'},
            e: []
        },
        {
            name: 'null',
            node: {t: 'div', e: null},
            e: []
        },
        {
            name: 'empty',
            node: {t: 'div', e: {}},
            e: []
        },
        {
            name: 'click one',
            node: {t: 'div', e: {click: testEventHandler}},
            e: ['click']
        },
        {
            name: 'click array two',
            node: {t: 'div', e: {click: [testEventHandler, testEventHandler]}},
            e: ['click', 'click']
        },
        {
            name: 'click one + mouseover one',
            node: {t: 'div', e: {click: testEventHandler, mouseover: testEventHandler}},
            e: ['click', 'mouseover']
        },
        {
            name: 'click exception + click exception',
            node: {t: 'div', e: {click: [testExceptionEventHandler, testExceptionEventHandler]}},
            e: ['click', 'click']
        }
    ];

    describe('events', function () {
        describe('normalization', function () {
            var node, callbackEvent;
            beforeEach(function () {
                node = cito.vdom.append(document.body, {
                    t: 'div',
                    e: {
                        click: function (event) {
                            callbackEvent = event;
                        }
                    }
                });
                dispatchEvent(node.dom, createEvent('click'));
            });
            afterEach(function () {
                cito.vdom.remove(node);
            });

            it('missing properties are added', function () {
                expect(callbackEvent).to.have.property('defaultPrevented', false);
                expect(callbackEvent.returnValue).not.to.be(false);
                expect(callbackEvent).to.have.property('target');
                expect(callbackEvent).to.have.property('currentTarget');
                expect(callbackEvent.preventDefault).to.be.a('function');
                expect(callbackEvent.stopPropagation).to.be.a('function');
                expect(callbackEvent.stopImmediatePropagation).to.be.a('function');
            });
        });

        describe('handlers', function () {
            var node;
            beforeEach(function () {
                callbackEventTypes = [];
            });
            afterEach(function () {
                callbackEventTypes = undefined;
                cito.vdom.remove(node);
            });

            forEachCombination(eventDefs, function (def1, def2) {
                it(def1.name + ' -> ' + def2.name, function () {
                    var allEvents = _.uniq(def1.events.concat(def2.events));
                    node = cito.vdom.append(document.body, _.cloneDeep(def1.node));
                    var createAndDispatchEvent = function (type) {
                        dispatchEvent(node.dom, createEvent(type));
                    };
                    _.forEach(allEvents, createAndDispatchEvent);
                    expect(callbackEventTypes.sort()).to.eql(def1.events.sort());

                    cito.vdom.update(node, _.cloneDeep(def2.node));
                    callbackEventTypes = [];
                    _.forEach(allEvents, createAndDispatchEvent);
                    expect(callbackEventTypes.sort()).to.eql(def2.events.sort());
                });
            });
        });

        describe('bubbling', function () {
            var node, callbackEvents;
            beforeEach(function () {
                callbackEventDescs = [];
                callbackEvents = [];
                node = cito.vdom.append(document.body, _.cloneDeep(nodeWithNestedEvents));
            });
            afterEach(function () {
                callbackEventDescs = undefined;
                callbackEvents = undefined;
                customEventHandler = undefined;
                cito.vdom.remove(node);
            });

            it('works', function () {
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1', 'click inner 2', 'click outer']);
            });

            it('this and currentTarget is set correctly', function () {
                var thises = [], currentTargets = [];
                customEventHandler = function (event) {
                    thises.push(this);
                    currentTargets.push(event.currentTarget);
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                var domChild = node.children.dom,
                    expectedCurrentTargets = [domChild, domChild, node.dom];
                expect(thises).to.eql(expectedCurrentTargets);
                expect(currentTargets).to.eql(expectedCurrentTargets);
            });

            it('stopPropagation() stops bubbling', function () {
                customEventHandler = function (event) {
                    event.stopPropagation();
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1', 'click inner 2']);
            });

            it('stopImmediatePropagation() stops bubbling and other handlers', function () {
                customEventHandler = function (event) {
                    event.stopImmediatePropagation();
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1']);
            });

            it('preventDefault() prevents default', function () {
                customEventHandler = function (event) {
                    callbackEvents.push(event);
                    event.preventDefault();
                };
                testPreventDefault();
            });

            it('return false prevents default', function () {
                customEventHandler = function (event) {
                    callbackEvents.push(event);
                    return false;
                };
                testPreventDefault();
            });

            function testPreventDefault() {
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(mapProp(callbackEvents, 'defaultPrevented')).to.eql([true, true, true]);
                expect(callbackEventDescs).to.have.length(3);
            }
        });
    });

    // TODO test this, multiple listeners, return false
    describe('lifecycle events', function () {
        it('$created', function () {
            var caughtEvent;
            var node = cito.vdom.create({
                t: 'div', e: {
                    $created: function (event) {
                        caughtEvent = event;
                    }
                }
            });
            expect(caughtEvent).to.have.property('type', '$created');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent.virtualNode).to.eql(node);
        });

        it('$changed', function () {
            var caughtEvent;
            var changedHandler = function (event) {
                caughtEvent = event;
            };
            var node = cito.vdom.create({t: 'div', e: {$changed: changedHandler}});
            expect(caughtEvent).to.be(undefined);

            cito.vdom.update(node, {t: 'div', a: {id: 'id1'}, e: {$changed: changedHandler}});

            expect(caughtEvent).to.have.property('type', '$changed');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent.virtualNode).to.eql(node);
            expect(caughtEvent.changes).to.eql(['id']);
        });

        it('$destroyed', function () {
            var caughtEvent;
            var domParent = document.createElement('div');

            var node = cito.vdom.append(domParent, {
                t: 'div', e: {
                    $destroyed: function (event) {
                        caughtEvent = event;
                    }
                }
            });

            expect(caughtEvent).to.be(undefined);
            cito.vdom.remove(node);

            expect(caughtEvent).to.have.property('type', '$destroyed');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent).to.have.property('virtualNode', node);
        });
    });

    if (document.registerElement) {
        var TestNormal = document.registerElement('test-normal', {
            prototype: Object.create(HTMLElement.prototype, {})
        });

        var TestExtended = document.registerElement('test-extended', {
            prototype: Object.create(HTMLButtonElement.prototype, {}),
            'extends': 'button'
        });

        describe('custom elements', function () {
            it('normal element', function () {
                var node = cito.vdom.create({t: 'test-normal'});
                expect(node.dom).to.be.a(TestNormal);
            });

            it('extended element', function () {
                var node = cito.vdom.create({t: 'button', a: {is: 'test-extended'}});
                expect(node.dom).to.be.a(TestExtended);
            });

            it('changing is attribute creates new element', function () {
                var node = cito.vdom.create({t: 'button', a: {is: 'test-extended'}});
                expect(node.dom).to.be.a(TestExtended);
                cito.vdom.update(node, {t: 'button'});
                expect(node.dom).to.be.an(HTMLButtonElement);
            });
        });
    }

    function forEachCombination(defs, callback) {
        _.forEach(defs, function (def1) {
            _.forEach(defs, function (def2) {
                callback(def1, def2);
            });
        });
    }

    function verifyNamespaces(domNode, namespaces, flat) {
        if (namespaces) {
            if (!flat) {
                var flatNamespaces = {};
                _.forEach(namespaces, function (tagsOrAttrs, namespace) {
                    _.forEach(tagsOrAttrs, function (tagOrAttr) {
                        flatNamespaces[tagOrAttr] = namespace;
                    });
                });
                namespaces = flatNamespaces;
            }
            var namespace = namespaces[domNode.tagName.toLowerCase()];
            if (namespace) {
                expect(domNode.namespaceURI).to.be(namespace);
            }
            var attrs = domNode.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                namespace = namespaces[attr.name];
                if (namespace) {
                    var attrNamespace = attr.namespaceURI;
                    expect(attrNamespace).to.be(namespace);
                }
            }
            _.forEach(domNode.children, function (domChild) {
                verifyNamespaces(domChild, namespaces, true);
            });
        }
    }

    function normNodes(nodes) {
        return _.map(nodes, normNode);
    }

    function normNode(node) {
        if (_.isArray(node)) {
            return normNodes(node);
        } else if (_.isString(node)) {
            return {t: '#', c: node};
        } else {
            node = {t: node.tag, c: node.children};
            if (node.tag.match(/[a-z0-9]+/)) {
                var children = node.children;
                if (!_.isArray(children)) {
                    children = children || _.isString(children) ? [children] : [];
                }
                node.children = _.map(children, normNode);
            }
            return node;
        }
    }

    var supportsEventConstructor = true;
    try {
        new CustomEvent('custom');
    } catch (e) {
        supportsEventConstructor = false;
    }

    var helperEvent = createEvent('custom'), fixPreventDefault;
    if (helperEvent.preventDefault) {
        helperEvent.preventDefault();
        fixPreventDefault = !helperEvent.defaultPrevented;
    }

    function createEvent(type, detail) {
        var event;
        if (supportsEventConstructor) {
            event = new CustomEvent(type, {bubbles: true, cancelable: true, detail: detail});
        } else if (document.createEvent) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, detail);
        } else {
            event = document.createEventObject();
            event.type = type;
            event.detail = detail;
        }
        if (fixPreventDefault) {
            event.preventDefault = function () {
                if (!this.defaultPrevented) {
                    Object.defineProperty(this, "defaultPrevented", {
                        get: function () {
                            return true;
                        }
                    });
                }
            };
        }
        return event;
    }

    function dispatchEvent(target, event) {
        if (target.dispatchEvent) {
            target.dispatchEvent(event);
        } else {
            target.fireEvent('on' + event.type, event);
        }
    }

    var expectPrototype = expect().constructor.prototype;
    expectPrototype.eqlDom = function (obj) {
        var html1 = getHtml(this.obj), html2 = getHtml(obj);
        this.assert(normHtml(html1) === normHtml(html2),
            function () {
                return 'expected ' + html1 + ' to equal DOM ' + html2;
            },
            function () {
                return 'expected ' + html1 + ' to not equal DOM ' + html2;
            }
        );
        return this;
    };

    function getHtml(value) {
        if (value && value.outerHTML) {
            return value.outerHTML;
        } else if (value && value.nodeType) {
            while (helperDiv.firstChild) {
                helperDiv.removeChild(helperDiv.firstChild);
            }
            helperDiv.appendChild(value.cloneNode(true));
            return helperDiv.innerHTML;
        } else {
            return '' + value;
        }
    }

    // TODO compare dom/vdom instead of string
    function normHtml(html) {
        html = html.toLowerCase();
        html = html.replace(/xmlns(:\w+)?=".*?"/g, '');
        html = html.replace(/(style|class)=""/g, '');
        html = html.replace(/=""/g, '');
        html = html.replace(/(<([\w-]+)[^/>]*)\/>/g, '$1></$2>');
        html = html.replace(/(<[\w-]+)(.*?)(>)/g, function (match, start, attrsStr, end) {
            var attrs = [];
            var attrMatch, attrRegEx = /([\w-]+)(?:=(?:(["'])(.*?)\2)|=([^ ]*))?/g;
            while (attrMatch = attrRegEx.exec(attrsStr)) {
                var normedAttr;
                if (attrMatch === '"') {
                    normedAttr = attrMatch[0]
                } else if (attrMatch[3]) {
                    var attrValue = (attrMatch[3] || attrMatch[2]).replace('"', "&quot;");
                    normedAttr = attrMatch[1] + '="' + attrValue + '"';
                } else {
                    normedAttr = attrMatch[0];
                }
                attrs.push(normedAttr);
            }
            return start + attrs.sort().join(' ') + end;
        });
        html = html.replace(/(style=")(.*?)"/g, function (match, start, style, end) {
            return start + style.split(/;\s*/).sort().join(';') + '"';
        });
        html = html.replace(/[\s";]/g, '');
        return html;
    }

    function mapProp(array, prop) {
        return _.map(array, function (value) {
            return value[prop];
        });
    }

});