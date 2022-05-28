/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('customers', {
        id: 'id',
        fname: { type: 'varchar(1000)', notNull: true },
        lname: { type: 'varchar(1000)', notNull: true },
        dob: { type: 'varchar(1000)', notNull: true },
        email: { type: 'varchar(1000)', notNull: true },
        accountNumber: { type: 'varchar(1000)', notNull: true },
        nrc: { type: 'varchar(1000)', notNull: true },
        phone: { type: 'varchar(1000)', notNull: true },
        photoUri: { type: 'varchar(1000)', notNull: true },
        password: { type: 'varchar(1000)', notNull: true },
        isActive: { type: 'boolean', notNull: true },
        phone: { type: 'varchar(15)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createTable('account', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"customers"',
            onDelete: 'cascade',
        },
        balance: { type: 'numeric', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createTable('history', {
        id: 'id',
        userId: {
            type: 'integer',
            notNull: true,
            references: '"customers"',
            onDelete: 'cascade',
        },
        body: { type: 'text', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('account', 'userId')
    pgm.createIndex('history', 'userId')
}

exports.down = pgm => { };
